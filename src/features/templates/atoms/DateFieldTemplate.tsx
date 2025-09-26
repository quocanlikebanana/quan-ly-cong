import { DateOnly } from '@/features/shared/date.type'
import React, { useMemo, useCallback } from 'react'
import { Calendar } from '@/components/ui/calendar';
import { isDate } from "date-fns";
import { Input } from "@/components/ui/input";
import { Calendar as CalendarIcon } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

/**
* use calendar component to select date => dateOnly 
*/
export default function DateFieldTemplate({
    dateOnly,
    onDateOnlyChange,
}: {
    dateOnly: DateOnly;
    onDateOnlyChange: (dateOnly: DateOnly) => void;
}) {
    const selectedDate = useMemo(
        () => new Date(dateOnly.year, dateOnly.month - 1, dateOnly.day),
        [dateOnly]
    );

    const handleDateChange = useCallback(
        (date: Date) => {
            const newDateOnly: DateOnly = {
                year: date.getFullYear(),
                month: date.getMonth() + 1, // Months are 0-indexed in JavaScript
                day: date.getDate(),
            };
            onDateOnlyChange(newDateOnly);
        },
        [onDateOnlyChange]
    );

    return (
        <Popover>
            <PopoverTrigger asChild>
                <div className="relative mb-4">
                    <Input
                        type="text"
                        value={`${dateOnly.year}-${String(dateOnly.month).padStart(2, "0")}-${String(dateOnly.day).padStart(2, "0")}`}
                        readOnly
                        className="pr-10 cursor-pointer"
                    />
                    <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(selected) => {
                        if (isDate(selected)) {
                            handleDateChange(selected);
                        }
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
