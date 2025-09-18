"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

interface EnhancedDatePickerProps {
	selectedDate: Date | null;
	onDateChange: (date: Date | null) => void;
	scheduleDates: string[];
}

export function EnhancedDatePicker({
	selectedDate,
	onDateChange,
	scheduleDates,
}: EnhancedDatePickerProps) {
	const [open, setOpen] = useState(false);

	const handleDateSelect = (date: Date | undefined) => {
		if (date) {
			onDateChange(date);
			setOpen(false);
		}
	};

	// Convert string dates to Date objects for highlighting
	const scheduleDateObjects = scheduleDates.map((dateStr) => new Date(dateStr));

	return (
		<div className="space-y-4">
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="space-y-2 sm:flex-1">
					<Popover open={open} onOpenChange={setOpen}>
						<PopoverTrigger asChild>
							<Button
								variant="outline"
								className={cn(
									"justify-start text-left font-normal",
									!selectedDate && "text-muted-foreground",
								)}
							>
								<CalendarIcon className="mr-1 h-4 w-4" />
								{selectedDate ? (
									format(selectedDate, "yyyy-MM-dd")
								) : (
									<span>選択</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent
							className="w-auto p-0 bg-white border shadow-lg z-50"
							align="start"
							side="bottom"
							sideOffset={4}
						>
							<Calendar
								mode="single"
								selected={selectedDate || undefined}
								onSelect={handleDateSelect}
								disabled={(date) => {
									// Disable dates that are not in the schedule
									return !scheduleDateObjects.some(
										(scheduleDate) =>
											format(scheduleDate, "yyyy-MM-dd") ===
											format(date, "yyyy-MM-dd"),
									);
								}}
								modifiers={{
									scheduled: scheduleDateObjects,
								}}
								modifiersClassNames={{
									scheduled:
										"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
								}}
								className="rounded-md border"
								classNames={{
									months: "flex gap-4 flex-col md:flex-row relative",
									month: "flex flex-col w-full gap-4",
									table: "w-full border-collapse",
									head_row: "flex",
									row: "flex w-full mt-2",
									cell: "h-9 w-9 text-center p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
									day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
									day_selected:
										"bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
									day_today: "bg-accent text-accent-foreground",
									day_outside: "text-muted-foreground opacity-50",
									day_disabled: "text-muted-foreground opacity-50",
									day_range_middle:
										"aria-selected:bg-accent aria-selected:text-accent-foreground",
									day_hidden: "invisible",
								}}
								fixedWeeks={true}
								modifiersStyles={{
									scheduleDate: {
										backgroundColor: "#fee2e2",
										color: "#dc2626",
										fontWeight: "bold",
									},
								}}
							/>
						</PopoverContent>
					</Popover>
				</div>
			</div>
		</div>
	);
}
