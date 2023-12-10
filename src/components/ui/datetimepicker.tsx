import * as React from "react";
import { DateTime } from "luxon";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "./button";
import { Calendar } from "./calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "./popover";
import { cn } from "@/lib/utils";
import { SelectSingleEventHandler } from "react-day-picker";
import { Label } from "./label";
import { Input } from "./input";

interface DateTimePickerProps {
	date: Date;
	setDate: (date: Date) => void;
    onTurnOn: (date: Date) => void; // Callback for handling "Turn On"
    onTurnOff: (date: Date) => void; // Callback for handling "Turn Off"
}

export function DateTimePicker({ date, setDate, onTurnOn, onTurnOff }: DateTimePickerProps) {
	const [selectedDateTime, setSelectedDateTime] = React.useState<DateTime>(
		DateTime.fromJSDate(date)
	);

	const handleSelect: SelectSingleEventHandler = (_day, selected) => {
		const selectedDay = DateTime.fromJSDate(selected);
		const modifiedDay = selectedDay.set({
			hour: selectedDateTime.hour,
			minute: selectedDateTime.minute,
		});

		setSelectedDateTime(modifiedDay);
		setDate(modifiedDay.toJSDate());
	};

	const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		const { value } = e.target;
		const hours = Number.parseInt(value.split(":")[0] || "00", 10);
		const minutes = Number.parseInt(value.split(":")[1] || "00", 10);
		const modifiedDay = selectedDateTime.set({ hour: hours, minute: minutes });

		setSelectedDateTime(modifiedDay);
		setDate(modifiedDay.toJSDate());
	};

	const footer = (
		<>
			<div className="px-4 pt-0 pb-4">
				<Label>Time</Label>
				<Input
					type="time"
					onChange={handleTimeChange}
					value={selectedDateTime.toFormat("HH:mm")}
				/>
			</div>
			{!selectedDateTime && <p>Please pick a day.</p>}
		</>
	);

	return (
		<Popover>
			<PopoverTrigger asChild className="z-10">
				<Button
					variant={"outline"}
					className={cn(
						"w-[280px] justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? (
						selectedDateTime.toFormat("DDD HH:mm")
					) : (
						<span>Pick a date</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={selectedDateTime.toJSDate()}
					onSelect={handleSelect}
					initialFocus
				/>
				{footer}
                <div className="flex justify-center space-x-2 py-2">
                    <Button onClick={() => onTurnOn(date)}>Turn On</Button>
                    <Button onClick={() => onTurnOff(date)}>Turn Off</Button>
                </div>
			</PopoverContent>
		</Popover>
	);
}
