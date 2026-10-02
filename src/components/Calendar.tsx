import { useState } from "react";
import { type Day } from "@/types";
import { useIsMobile } from "@/hooks/useIsMobile";
import WeekdayHeader from "./calendar/WeekdayHeader";
import DayHoverCard from "./calendar/DayHoverCard";
import DayDetailsDrawer from "./calendar/DayDetailsDrawer";

type CalendarProps = {
	calendar: Day[];
};

export default function Calendar({ calendar }: CalendarProps) {
	const [selectedDay, setSelectedDay] = useState<Day | null>(null);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const isMobile = useIsMobile();

	function handleDayClick(day: Day) {
		if (day.filler || !day.date || !isMobile) return;
		setSelectedDay(day);
		setDrawerOpen(true);
	}

	return (
		<>
			<div className="w-full grid grid-cols-7 gap-1 mb-12">
				<WeekdayHeader />
				{calendar.map((day, index) => (
					<DayHoverCard key={index} day={day} onSelect={handleDayClick} />
				))}
			</div>

			<DayDetailsDrawer
				day={selectedDay}
				open={drawerOpen}
				onOpenChange={setDrawerOpen}
			/>
		</>
	);
}
