import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import axios from 'axios';
import { logError } from '@/lib/logError';
import { loginUser, registerUser } from '@/components/Auth/auth';
import {
    createIncident,
    updateIncident,
    fetchIncidentById,
    fetchUsernameById,
    addCaseDiscussion,
} from '@/components/Incident/incident';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';

vi.mock('axios', () => ({
    default: { get: vi.fn(), post: vi.fn(), patch: vi.fn() },
}));

function privateError() {
    return Object.assign(new Error('PRIVATE_PASSWORD PRIVATE_TOKEN'), {
        code: 'ERR_BAD_REQUEST',
        config: {
            url: 'https://api.example/users/PRIVATE_USER_ID',
            headers: {
                Authorization: 'Bearer PRIVATE_TOKEN',
                Cookie: 'PRIVATE_COOKIE',
            },
            data: JSON.stringify({
                password: 'PRIVATE_PASSWORD',
                email: 'PRIVATE_EMAIL',
            }),
        },
        response: { status: 401, data: { message: 'PRIVATE_RESPONSE' } },
        request: { responseURL: 'https://example/?token=PRIVATE_TOKEN' },
        toJSON: vi.fn(() => {
            throw new Error('Must not serialize errors');
        }),
    });
}

let errorLog;
beforeEach(() => {
    errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
});
afterEach(() => vi.restoreAllMocks());

describe('Sanitized application error logging', () => {
    test('retains useful HTTP diagnostics while excluding every private error field', () => {
        const error = privateError();
        logError('auth.login', error);
        expect(errorLog).toHaveBeenCalledExactlyOnceWith('Login failed.', {
            status: 401,
            code: 'ERR_BAD_REQUEST',
        });
        expect(JSON.stringify(errorLog.mock.calls)).not.toContain('PRIVATE');
        expect(error.toJSON).not.toHaveBeenCalled();
    });

    test.each([
        null,
        'PRIVATE_TOKEN',
        {
            code: 'PRIVATE_TOKEN',
            response: { status: '401 PRIVATE_PASSWORD' },
        },
        { code: { token: 'PRIVATE_TOKEN' }, response: { status: 999 } },
    ])('ignores untrusted metadata and event names %#', (error) => {
        logError('PRIVATE_EVENT', error);
        expect(errorLog).toHaveBeenCalledExactlyOnceWith(
            'Application operation failed.',
            {}
        );
    });

    test('throwing accessors cannot mask the original application failure', () => {
        const error = Object.defineProperty({}, 'response', {
            get() {
                throw new Error('PRIVATE_TOKEN');
            },
        });
        expect(() => logError('incident.fetch', error)).not.toThrow();
        expect(errorLog).toHaveBeenCalledExactlyOnceWith(
            'Incident retrieval failed.',
            {}
        );
    });

    test.each([
        ['login', () => loginUser('member', 'PRIVATE_PASSWORD'), 'post'],
        [
            'registration',
            () => registerUser('PRIVATE_EMAIL', 'member', 'PRIVATE_PASSWORD'),
            'post',
        ],
        [
            'incident creation',
            () =>
                createIncident(
                    { description: 'PRIVATE_REPORT' },
                    'PRIVATE_TOKEN'
                ),
            'post',
        ],
        [
            'incident update',
            () =>
                updateIncident(
                    'PRIVATE_ID',
                    { description: 'PRIVATE_REPORT' },
                    'PRIVATE_TOKEN'
                ),
            'patch',
        ],
        [
            'incident retrieval',
            () => fetchIncidentById('PRIVATE_ID', 'PRIVATE_TOKEN'),
            'get',
        ],
        [
            'discussion creation',
            () =>
                addCaseDiscussion(
                    'PRIVATE_ID',
                    { message: 'PRIVATE_MESSAGE' },
                    'PRIVATE_TOKEN'
                ),
            'post',
        ],
    ])(
        '%s rethrows the original error without logging it',
        async (_, request, method) => {
            const error = privateError();
            axios[method].mockRejectedValueOnce(error);
            await expect(request()).rejects.toBe(error);
            expect(errorLog).toHaveBeenCalledTimes(1);
            expect(errorLog.mock.calls[0][1]).toEqual({
                status: 401,
                code: 'ERR_BAD_REQUEST',
            });
            expect(JSON.stringify(errorLog.mock.calls)).not.toContain(
                'PRIVATE'
            );
        }
    );

    test('failed author lookup preserves its fallback without logging the user ID or token', async () => {
        axios.get.mockRejectedValueOnce(privateError());
        await expect(
            fetchUsernameById('PRIVATE_USER_ID', 'PRIVATE_TOKEN')
        ).resolves.toBe('Unknown User');
        expect(errorLog).toHaveBeenCalledExactlyOnceWith(
            'Author lookup failed.',
            {
                status: 401,
                code: 'ERR_BAD_REQUEST',
            }
        );
    });

    test('React error boundary omits raw errors and component stacks', () => {
        const boundary = new ErrorBoundary({});
        boundary.componentDidCatch(new Error('PRIVATE_TOKEN'), {
            componentStack: 'PRIVATE_COMPONENT_STACK',
        });
        expect(errorLog).toHaveBeenCalledExactlyOnceWith(
            'Application rendering failed.',
            {}
        );
    });
});
