import {
	compareAsc,
	format,
	isFuture,
	isPast,
	isSameDay,
	isToday,
} from "date-fns";
import { type Day, Contest } from "@/types";
import ContestListItem from "./ContestListItem";

function convertCalendarToContests(calendar: Day[]): Record<string, Contest[]> {
	const contests: Record<string, Contest[]> = {};
	for (let day of calendar.filter((day) => !day.filler)) {
		if (day.date && day.contests && day.contests.length > 0)
			contests[format(day.date, "yyyy-MM-dd")] = day.contests;
	}
	return contests;
}

type ListProps = {
	calendar: Day[];
};

export default function List({ calendar }: ListProps) {
	const contestsForList = convertCalendarToContests(calendar);
	const today = new Date();

	const events = Object.entries(contestsForList).sort(([a], [b]) =>
		compareAsc(a, b),
	);

	const upcomingEvents = events.filter(([a]) => isToday(a) || isFuture(a));
	const pastEvents = events.filter(
		([a]) => isPast(a) && !isSameDay(a, new Date()),
	);

	return (
		<ul className="flex flex-col gap-8">
			<li className="w-full flex items-center gap-2 text-neutral-600 mt-4">
				<div className="w-full flex-1 h-0.5 bg-neutral-800 rounded-full" />
				Upcoming Events
				<div className="w-full flex-1 h-0.5 bg-neutral-800 rounded-full" />
			</li>
			{upcomingEvents.map(([key, value]) => (
				<span key={key} className="flex flex-col gap-2">
					<li key={key} className="text-neutral-600 scroll-mt-4">
						{format(key, "dd MM yyyy")}
					</li>
					{value.map((cont) => (
						<ContestListItem key={cont._id} contest={cont} />
					))}
				</span>
			))}
			{pastEvents.length > 0 && (
				<>
					<li className="w-full flex items-center gap-2 text-neutral-600 mt-12">
						<div className="w-full flex-1 h-0.5 bg-neutral-800 rounded-full" />
						Past Events
						<div className="w-full flex-1 h-0.5 bg-neutral-800 rounded-full" />
					</li>
					{pastEvents.map(([key, value]) => (
						<span key={key} className="flex flex-col gap-2">
							<li
								id={
									isSameDay(today, new Date(key))
										? "today"
										: undefined
								}
								className="text-neutral-600 scroll-mt-4"
							>
								{format(key, "dd MM yyyy")}
							</li>
							{value.map((cont) => (
								<ContestListItem key={cont._id} contest={cont} />
							))}
						</span>
					))}
				</>
			)}
		</ul>
	);
}
