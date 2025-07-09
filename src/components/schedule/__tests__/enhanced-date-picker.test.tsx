import { render, screen, fireEvent } from '@testing-library/react';
import { EnhancedDatePicker } from '../enhanced-date-picker';

describe('EnhancedDatePicker', () => {
  const mockOnDateChange = jest.fn();
  const mockScheduleDates = ['2024-01-15', '2024-02-20', '2024-03-10'];

  beforeEach(() => {
    mockOnDateChange.mockClear();
  });

  test('renders date input field', () => {
    render(
      <EnhancedDatePicker
        selectedDate={null}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    expect(screen.getByLabelText('日付を選択')).toBeInTheDocument();
  });

  test('calls onDateChange when date input changes', () => {
    render(
      <EnhancedDatePicker
        selectedDate={null}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    const dateInput = screen.getByLabelText('日付を選択');
    fireEvent.change(dateInput, { target: { value: '2024-01-15' } });

    expect(mockOnDateChange).toHaveBeenCalledWith(expect.any(Date));
  });

  test('shows schedule date indicator', () => {
    render(
      <EnhancedDatePicker
        selectedDate={null}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    expect(screen.getByText('予定がある日付')).toBeInTheDocument();
  });
});