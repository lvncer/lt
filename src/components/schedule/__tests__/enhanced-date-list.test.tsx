import { render, screen, fireEvent } from '@testing-library/react';
import { EnhancedDateList } from '../enhanced-date-list';

describe('EnhancedDateList', () => {
  const mockOnDateSelect = jest.fn();
  const mockDates = [
    '2024-01-15',
    '2024-02-20',
    '2024-03-10',
    '2025-01-05',
    '2025-02-14'
  ];

  beforeEach(() => {
    mockOnDateSelect.mockClear();
  });

  test('renders title', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    expect(screen.getByText('予定のある日付')).toBeInTheDocument();
  });

  test('groups dates by year', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    expect(screen.getByText('2024年')).toBeInTheDocument();
    expect(screen.getByText('2025年')).toBeInTheDocument();
  });

  test('displays date count badge for each year', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    expect(screen.getByText('3件')).toBeInTheDocument(); // 2024 dates
    expect(screen.getByText('2件')).toBeInTheDocument(); // 2025 dates
  });

  test('formats dates correctly', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    expect(screen.getByText('1月15日 (月)')).toBeInTheDocument();
    expect(screen.getByText('2月20日 (火)')).toBeInTheDocument();
  });

  test('highlights selected date', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    const selectedButton = screen.getByText('1月15日 (月)').closest('button');
    expect(selectedButton).toHaveClass('bg-primary');
  });

  test('calls onDateSelect when date is clicked', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    const dateButton = screen.getByText('2月20日 (火)').closest('button');
    fireEvent.click(dateButton!);

    expect(mockOnDateSelect).toHaveBeenCalledWith('2024-02-20');
  });

  test('shows empty state when no dates', () => {
    render(
      <EnhancedDateList
        dates={[]}
        selectedDate=""
        onDateSelect={mockOnDateSelect}
      />
    );

    expect(screen.getByText('予定されているイベントはありません')).toBeInTheDocument();
  });

  test('shows event type label', () => {
    render(
      <EnhancedDateList
        dates={mockDates}
        selectedDate="2024-01-15"
        onDateSelect={mockOnDateSelect}
      />
    );

    const eventLabels = screen.getAllByText('ライトニングトーク');
    expect(eventLabels).toHaveLength(mockDates.length);
  });
});