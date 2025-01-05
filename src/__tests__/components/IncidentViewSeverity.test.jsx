import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import IncidentView from '../../components/Incident/IncidentView/IncidentView';
import { vi } from 'vitest';

describe('IncidentView - Severity Badge', () => {
    const mockIncident = {
        _id: '1',
        title: 'Test Incident',
        severity: 'Low',
        description: 'This is a test description.',
        caseDiscussion: [],
    };

    const renderComponent = (severity) => {
        const incidentWithSeverity = { ...mockIncident, severity };
        render(
            <Router>
                {' '}
                <IncidentView
                    incident={incidentWithSeverity}
                    onRefresh={vi.fn()}
                />
            </Router>
        );
    };

    it('should display the correct class for Low severity', () => {
        renderComponent('Low');
        const badge = screen.getByText('Low');
        expect(badge).toHaveClass('bg-green-100 text-green-800');
    });

    it('should display the correct class for Medium severity', () => {
        renderComponent('Medium');
        const badge = screen.getByText('Medium');
        expect(badge).toHaveClass('bg-yellow-100 text-yellow-800');
    });

    it('should display the correct class for High severity', () => {
        renderComponent('High');
        const badge = screen.getByText('High');
        expect(badge).toHaveClass('bg-orange-100 text-orange-800');
    });

    it('should display the correct class for Critical severity', () => {
        renderComponent('Critical');
        const badge = screen.getByText('Critical');
        expect(badge).toHaveClass('bg-red-100 text-red-800');
    });

    it('should display the default class for unknown severity', () => {
        renderComponent('Unknown');
        const badge = screen.getByText('Unknown');
        expect(badge).toHaveClass('bg-gray-200 text-gray-800');
    });
});
