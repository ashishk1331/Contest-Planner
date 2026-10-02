import { getDay } from "date-fns";
import { twMerge } from "tailwind-merge";

const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

export default function WeekdayHeader() {
	const todayIndex = getDay(new Date());

	return (
		<>
			{WEEKDAYS.map((day, index) => (
				<span
					key={day}
					className={twMerge(
						"p-1 py-2 w-full rounded-lg bg-neutral-900 text-center text-xs font-medium",
						todayIndex === index && "bg-neutral-800",
					)}
				>
					{day}
				</span>
			))}
		</>
	);
}
