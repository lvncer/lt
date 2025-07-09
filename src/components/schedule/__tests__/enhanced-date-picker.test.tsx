import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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

    expect(screen.getByLabelText('日付を直接入力')).toBeInTheDocument();
  });

  test('renders calendar trigger button', () => {
    render(
      <EnhancedDatePicker
        selectedDate={null}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    expect(screen.getByText('日付を選択してください')).toBeInTheDocument();
  });

  test('displays selected date in calendar button', () => {
    const selectedDate = new Date('2024-01-15');
    
    render(
      <EnhancedDatePicker
        selectedDate={selectedDate}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    expect(screen.getByText('2024年01月15日')).toBeInTheDocument();
  });

  test('calls onDateChange when date input changes', () => {
    render(
      <EnhancedDatePicker
        selectedDate={null}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    const dateInput = screen.getByLabelText('日付を直接入力');
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

  test('opens calendar when trigger button is clicked', async () => {
    render(
      <EnhancedDatePicker
        selectedDate={null}
        onDateChange={mockOnDateChange}
        scheduleDates={mockScheduleDates}
      />
    );

    const triggerButton = screen.getByText('日付を選択してください');
    fireEvent.click(triggerButton);

    await waitFor(() => {
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });
});