"use client";

import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

// calendar --->

function Calendar({
  selected,
  onSelect,
  month,
  onMonthChange,
  disabled,
  className,
}: Calendar.Props) {
  const [internalMonth, setInternalMonth] = useState(() => startOfMonth(month ?? new Date()));
  const displayMonth = month ?? internalMonth;

  const setDisplayMonth = (next: Date) => {
    if (onMonthChange) {
      onMonthChange(next);
    } else {
      setInternalMonth(next);
    }
  };

  const gridStart = startOfWeek(startOfMonth(displayMonth), { weekStartsOn: 1 });
  const days = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));

  const monthLabel = format(displayMonth, "MMMM yyyy");

  return (
    <div data-slot="calendar" className={cn("w-fit select-none", className)}>
      <div className="mb-2 flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          icon
          size="sm"
          aria-label="Previous month"
          onClick={() => setDisplayMonth(addMonths(displayMonth, -1))}>
          <Icons.ChevronLeft />
        </Button>
        <div className="text-sm font-medium">{monthLabel}</div>
        <Button
          type="button"
          variant="ghost"
          icon
          size="sm"
          aria-label="Next month"
          onClick={() => setDisplayMonth(addMonths(displayMonth, 1))}>
          <Icons.ChevronRight />
        </Button>
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="flex size-8 items-center justify-center text-xs font-medium text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const inMonth = isSameMonth(day, displayMonth);
          const selectedDay = selected != null && isSameDay(day, selected);
          const today = isToday(day);
          const dayDisabled = disabled?.(day) ?? false;
          return (
            <button
              key={day.toISOString()}
              type="button"
              data-slot="calendar-day"
              data-selected={selectedDay ? "" : undefined}
              data-today={today ? "" : undefined}
              disabled={dayDisabled}
              aria-pressed={selectedDay}
              aria-current={today ? "date" : undefined}
              onClick={() => onSelect?.(day)}
              className={cn(
                "flex size-8 items-center justify-center rounded-full text-sm transition-colors outline-none focus-visible:highlight disabled:pointer-events-none disabled:opacity-50",
                !inMonth && "text-muted-foreground/50",
                inMonth && !selectedDay && "hover:bg-muted",
                "data-today:font-medium data-today:ring-2 data-today:ring-primary data-today:ring-inset",
                "data-selected:bg-primary data-selected:text-primary-foreground data-selected:hover:bg-primary/90",
              )}>
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
namespace Calendar {
  export type Props = {
    selected?: Date | null;
    onSelect?: (date: Date) => void;
    month?: Date;
    onMonthChange?: (month: Date) => void;
    disabled?: (date: Date) => boolean;
    className?: string;
  };
}

// exports --->

export { Calendar };
