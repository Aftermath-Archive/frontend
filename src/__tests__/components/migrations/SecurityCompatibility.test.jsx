import { afterEach, describe, expect, test, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import axios from 'axios';
import useFetchIncidents from '@/hooks/useFetchIncidents';
import { fetchUsernameById } from '@/components/Incident/incident';
import { toast } from 'react-toastify';
vi.mock('axios', () => ({ default: { get: vi.fn() } }));
vi.mock('react-toastify', () => ({ toast: { error: vi.fn() } }));
afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
});
describe('Secured backend compatibility', () => {
    test('a backend that ignores pagination stops after its repeated page', async () => {
        const batch = Array.from({ length: 100 }, (_, id) => ({
            _id: String(id),
        }));
        const fetchMock = vi
            .fn()
            .mockResolvedValue({ ok: true, json: async () => batch });
        vi.stubGlobal('fetch', fetchMock);
        vi.spyOn(console, 'error').mockImplementation(() => {});
        const { result } = renderHook(() => useFetchIncidents());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(result.current.fetchedData).toEqual([]);
        expect(toast.error).toHaveBeenCalledWith('Failed to fetch incidents.');
    });
    test('leaving the page aborts an unfinished incident load', () => {
        const fetchMock = vi.fn().mockReturnValue(new Promise(() => {}));
        vi.stubGlobal('fetch', fetchMock);
        const { unmount } = renderHook(() => useFetchIncidents());
        const signal = fetchMock.mock.calls[0][1].signal;
        expect(signal.aborted).toBe(false);
        unmount();
        expect(signal.aborted).toBe(true);
    });
    test('author lookups send a token and skip anonymous directory access', async () => {
        axios.get.mockResolvedValue({ data: { username: 'member' } });
        expect(await fetchUsernameById('user-id', 'access-token')).toBe(
            'member'
        );
        expect(axios.get).toHaveBeenCalledWith(
            expect.stringContaining('/users/user-id'),
            {
                headers: { Authorization: 'Bearer access-token' },
            }
        );
        axios.get.mockClear();
        expect(await fetchUsernameById('user-id', '')).toBe('Unknown User');
        expect(axios.get).not.toHaveBeenCalled();
    });
    test('incident retrieval follows API pages rather than silently stopping at the default page', async () => {
        const first = Array.from({ length: 100 }, (_, id) => ({
            _id: String(id),
        }));
        const last = [{ _id: '100' }];
        const fetchMock = vi
            .fn()
            .mockResolvedValueOnce({ ok: true, json: async () => first })
            .mockResolvedValueOnce({ ok: true, json: async () => last });
        vi.stubGlobal('fetch', fetchMock);
        const { result } = renderHook(() => useFetchIncidents());
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.fetchedData).toHaveLength(101);
        expect(fetchMock.mock.calls[0][0]).toContain('page=1&limit=100');
        expect(fetchMock.mock.calls[1][0]).toContain('page=2&limit=100');
    });
});
