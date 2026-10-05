import { describe, test, expect, vi, beforeEach } from 'vitest';
import {
    act,
    render,
    renderHook,
    screen,
    within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import IncidentForm from '@/components/Incident/IncidentForm/IncidentForm';
import IncidentSearchTable from '@/components/Incident/IncidentSearch/IncidentSearch';
import HeaderMenu from '@/components/HeaderMenu/HeaderMenu';
import ProtectedRoute from '@/components/Auth/ProtectedRoute';
import { UserAuthContext } from '@/contexts/UserAuthContextProvider';
import { createIncident, updateIncident } from '@/components/Incident/incident';
import useFetchIncidents from '@/hooks/useFetchIncidents';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { useIsMobile } from '@/hooks/use-mobile';

vi.mock('@/components/Incident/incident', () => ({
    createIncident: vi.fn(),
    updateIncident: vi.fn(),
}));
vi.mock('@/hooks/useFetchIncidents', () => ({ default: vi.fn() }));
vi.mock('react-toastify', () => ({
    toast: { success: vi.fn(), warn: vi.fn(), error: vi.fn() },
}));
// jsdom has no layout; keep the real chart exports and bypass only sizing.
vi.mock('recharts', async (importOriginal) => ({
    ...(await importOriginal()),
    ResponsiveContainer: ({ children }) => children,
}));

const validIncident = {
    title: 'Database connection failure',
    description: 'Connections fail during peak traffic.',
    severity: 'High',
    environment: 'Production',
    affectedSystems: 'Database API',
    impactSummary: 'Customers cannot retrieve their records.',
    stepsToReproduce: 'Send requests during the peak traffic window.',
    tags: ['database'],
    relatedLinks: ['https://example.com/runbook'],
};
const incidents = [
    {
        ...validIncident,
        id: 'one',
        incidentAutoId: 'INC-002',
        title: 'Zeta failure',
        status: 'Open',
    },
    {
        ...validIncident,
        id: 'two',
        incidentAutoId: 'INC-001',
        title: 'Alpha failure',
        status: 'Resolved',
    },
];
const refreshIncidents = vi.fn();

beforeEach(() => {
    useFetchIncidents.mockReturnValue({
        fetchedData: incidents,
        loading: false,
        fetchIncidents: refreshIncidents,
    });
    createIncident.mockResolvedValue({ id: 'created' });
    updateIncident.mockResolvedValue({ id: 'existing' });
});

function renderForm(props = {}) {
    return render(
        <UserAuthContext.Provider value={['test-token', vi.fn()]}>
            <MemoryRouter>
                <Routes>
                    <Route path="/" element={<IncidentForm {...props} />} />
                    <Route
                        path="/incidents/:id"
                        element={<p>Saved incident</p>}
                    />
                </Routes>
            </MemoryRouter>
        </UserAuthContext.Provider>
    );
}

describe('dependency migration behavior', () => {
    test('invalid incident submissions display field errors without calling the API', async () => {
        const user = userEvent.setup();
        renderForm();
        await user.click(
            screen.getByRole('button', { name: 'Create Incident' })
        );
        expect(
            await screen.findByText('Title is required')
        ).toBeInTheDocument();
        expect(
            screen.getByText('Description must be at least 10 characters')
        ).toBeInTheDocument();
        expect(createIncident).not.toHaveBeenCalled();
    });

    test('creation validates and submits form fields, tags and links with the token', async () => {
        const user = userEvent.setup();
        renderForm();
        for (const [label, value] of [
            ['Incident Title', validIncident.title],
            ['Incident Description', validIncident.description],
            ['Affected Systems', validIncident.affectedSystems],
            ['Impact Summary', validIncident.impactSummary],
            ['Steps to reproduce', validIncident.stepsToReproduce],
            ['Tags (Optional)', 'database, api'],
            ['Links and References (Optional)', 'https://example.com/runbook'],
        ]) {
            await user.type(screen.getByLabelText(label), value);
        }
        await user.click(
            screen.getByRole('button', { name: 'Create Incident' })
        );
        expect(await screen.findByText('Saved incident')).toBeInTheDocument();
        expect(createIncident).toHaveBeenCalledWith(
            expect.objectContaining({
                title: validIncident.title,
                tags: ['database', 'api'],
                relatedLinks: validIncident.relatedLinks,
                severity: 'Low',
                environment: 'Production',
            }),
            'test-token'
        );
    });

    test('edit mode hydrates the form and preserves severity and related data', async () => {
        const user = userEvent.setup();
        renderForm({
            mode: 'edit',
            incidentId: 'existing',
            initialData: validIncident,
        });
        expect(screen.getByLabelText('Incident Title')).toHaveValue(
            validIncident.title
        );
        expect(
            screen.getByRole('combobox', { name: 'Severity Level' })
        ).toHaveTextContent('High');
        await user.click(
            screen.getByRole('button', { name: 'Update Incident' })
        );
        expect(await screen.findByText('Saved incident')).toBeInTheDocument();
        expect(updateIncident).toHaveBeenCalledWith(
            'existing',
            expect.objectContaining(validIncident),
            'test-token'
        );
    });

    test('table sorting and searching work with the new table feature API', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <IncidentSearchTable />
            </MemoryRouter>
        );
        const table = screen.getByRole('table');
        await user.click(within(table).getByRole('button', { name: 'Title' }));
        expect(within(table).getAllByRole('row')[1]).toHaveTextContent(
            'Alpha failure'
        );
        await user.click(within(table).getByRole('button', { name: 'Title' }));
        expect(within(table).getAllByRole('row')[1]).toHaveTextContent(
            'Zeta failure'
        );
        await user.type(
            screen.getByPlaceholderText('Search incidents...'),
            'alpha'
        );
        expect(within(table).getAllByRole('row')).toHaveLength(2);
        expect(
            within(table).queryByText('Zeta failure')
        ).not.toBeInTheDocument();
    });

    test('table refresh invokes the fetch action', async () => {
        const user = userEvent.setup();
        render(
            <MemoryRouter>
                <IncidentSearchTable />
            </MemoryRouter>
        );
        await user.click(
            screen.getByRole('button', { name: 'Refresh Incidents' })
        );
        expect(refreshIncidents).toHaveBeenCalledTimes(1);
    });

    test('mobile navigation opens and closes the real Headless UI dialog', async () => {
        const user = userEvent.setup();
        render(<HeaderMenu />);
        await user.click(
            screen.getByRole('button', { name: 'Open main menu' })
        );
        expect(screen.getByRole('dialog')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: 'Close menu' }));
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('chart tooltip displays zero values with the configured series label', () => {
        render(
            <ChartContainer
                config={{
                    count: { label: 'Number of Incidents', color: 'teal' },
                }}
            >
                <ChartTooltipContent
                    active
                    payload={[
                        {
                            name: 'count',
                            dataKey: 'count',
                            value: 0,
                            payload: { fill: 'teal' },
                        },
                    ]}
                />
            </ChartContainer>
        );
        expect(screen.getByText('0')).toBeInTheDocument();
        expect(
            screen.getAllByText('Number of Incidents').length
        ).toBeGreaterThan(0);
    });

    test('chart CSS is rendered as text without interpreting injected HTML', () => {
        const color = 'red; /* </style><img src=x onerror=alert(1)> */';
        const { container } = render(
            <ChartContainer config={{ count: { label: 'Count', color } }}>
                <div>Chart content</div>
            </ChartContainer>
        );
        expect(container.querySelector('style').textContent).toContain(color);
        expect(container.querySelector('img')).toBeNull();
        expect(screen.getByText('Chart content')).toBeInTheDocument();
    });

    test('mobile detection starts at the viewport width and cleans up its listener', () => {
        const initialWidth = window.innerWidth;
        const initialMatchMedia = window.matchMedia;
        const addEventListener = vi.fn();
        const removeEventListener = vi.fn();
        window.matchMedia = vi.fn(() => ({
            addEventListener,
            removeEventListener,
        }));
        window.innerWidth = 500;
        let cleanup;
        try {
            const { result, unmount } = renderHook(() => useIsMobile());
            cleanup = unmount;
            expect(result.current).toBe(true);
            const [event, listener] = addEventListener.mock.calls[0];
            expect(event).toBe('change');
            act(() => {
                window.innerWidth = 1024;
                listener();
            });
            expect(result.current).toBe(false);
            unmount();
            cleanup = undefined;
            expect(removeEventListener).toHaveBeenCalledWith(
                'change',
                listener
            );
        } finally {
            cleanup?.();
            window.innerWidth = initialWidth;
            window.matchMedia = initialMatchMedia;
        }
    });

    test.each([
        ['', 'Login required'],
        ['test-token', 'Protected content'],
    ])('protected routes handle token %s', (token, expected) => {
        render(
            <UserAuthContext.Provider value={[token, vi.fn()]}>
                <MemoryRouter initialEntries={['/protected']}>
                    <Routes>
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="/protected"
                                element={<p>Protected content</p>}
                            />
                        </Route>
                        <Route
                            path="/auth/login"
                            element={<p>Login required</p>}
                        />
                    </Routes>
                </MemoryRouter>
            </UserAuthContext.Provider>
        );
        expect(screen.getByText(expected)).toBeInTheDocument();
    });
});
