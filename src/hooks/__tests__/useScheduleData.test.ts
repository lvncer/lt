import { renderHook } from '@testing-library/react';
import { useScheduleData } from '../useScheduleData';
import useSWR from 'swr';

// Mock SWR
jest.mock('swr', () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('useScheduleData', () => {
  const mockUseSWR = jest.mocked(useSWR);
  const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

  beforeEach(() => {
    mockUseSWR.mockClear();
    mockFetch.mockClear();
  });

  test('returns initial state', () => {
    mockUseSWR.mockReturnValue({
      data: undefined,
      error: null,
      isLoading: true,
    });

    const { result } = renderHook(() => useScheduleData());

    expect(result.current.dates).toEqual([]);
    expect(result.current.isDatesLoading).toBe(true);
    expect(result.current.datesError).toBeNull();
  });

  test('returns dates when loaded', () => {
    const mockDates = ['2024-01-15', '2024-02-20'];
    mockUseSWR.mockReturnValue({
      data: mockDates,
      error: null,
      isLoading: false,
    });

    const { result } = renderHook(() => useScheduleData());

    expect(result.current.dates).toEqual(mockDates);
    expect(result.current.isDatesLoading).toBe(false);
  });

  test('preloadScheduleData makes fetch request', async () => {
    mockUseSWR.mockReturnValue({
      data: ['2024-01-15'],
      error: null,
      isLoading: false,
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Test Talk' }],
    } as Response);

    const { result } = renderHook(() => useScheduleData());
    const targetDate = new Date('2024-01-15');

    await result.current.preloadScheduleData(targetDate);

    expect(mockFetch).toHaveBeenCalledWith('/api/daily-schedule?date=2024-01-15');
  });

  test('getCachedScheduleData returns cached data', async () => {
    mockUseSWR.mockReturnValue({
      data: ['2024-01-15'],
      error: null,
      isLoading: false,
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Test Talk' }],
    } as Response);

    const { result } = renderHook(() => useScheduleData());
    const targetDate = new Date('2024-01-15');

    await result.current.preloadScheduleData(targetDate);

    const cachedData = result.current.getCachedScheduleData('2024-01-15');
    expect(cachedData).toEqual([{ id: 1, title: 'Test Talk' }]);
  });

  test('clearCache removes all cached data', async () => {
    mockUseSWR.mockReturnValue({
      data: ['2024-01-15'],
      error: null,
      isLoading: false,
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [{ id: 1, title: 'Test Talk' }],
    } as Response);

    const { result } = renderHook(() => useScheduleData());
    const targetDate = new Date('2024-01-15');

    await result.current.preloadScheduleData(targetDate);
    result.current.clearCache();

    const cachedData = result.current.getCachedScheduleData('2024-01-15');
    expect(cachedData).toBeNull();
  });

  test('handles fetch errors gracefully', async () => {
    mockUseSWR.mockReturnValue({
      data: ['2024-01-15'],
      error: null,
      isLoading: false,
    });

    mockFetch.mockRejectedValue(new Error('Network error'));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    const { result } = renderHook(() => useScheduleData());
    const targetDate = new Date('2024-01-15');

    await result.current.preloadScheduleData(targetDate);

    expect(consoleSpy).toHaveBeenCalledWith('Failed to preload schedule data:', expect.any(Error));
    consoleSpy.mockRestore();
  });
});