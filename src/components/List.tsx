import {
	compareAsc,
	format,
	isFuture,
	isPast,
	isSameDay,
	isToday,
	isWithinInterval,
	parseISO,
} from "date-fns";
import { Circle } from "@phosphor-icons/react";
import { type Day, Contest } from "@/types";
import PlatformLogo from "./PlatformLogo";
import { twMerge } from "tailwind-merge";
import { useCountdown } from "@/hooks/useCountdown";

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
	const pastEvents = events.filter(([a]) => isPast(a));

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
						<ListItem contest={cont} today={today} />
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
								<ListItem contest={cont} today={today} />
							))}
						</span>
					))}
				</>
			)}
		</ul>
	);
}

function ListItem({ contest, today }: { contest: Contest; today: Date }) {
	const now = new Date();
	const contestStart = parseISO(contest.contestStartDate);
	const contestEnd = parseISO(contest.contestEndDate);

	const isContestLive = isWithinInterval(now, {
		start: contestStart,
		end: contestEnd,
	});
	const { days, hours, minutes } = useCountdown(contestStart);

	return (
		<li
			key={contest._id}
			className={twMerge(
				"w-full py-4 px-5 bg-neutral-900 rounded flex items-center gap-4",
				isSameDay(today, contest.contestStartDate) && "bg-green-950/25",
			)}
		>
			<PlatformLogo platform={contest.platform} />
			<div className="flex flex-col items-start gap-2">
				<a
					href={contest.contestUrl}
					className={twMerge(
						"underline underline-offset-2",
						isPast(contest.contestStartDate) &&
							"text-neutral-500 no-underline",
					)}
				>
					{contest.contestName}
				</a>
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 *:text-neutral-500 *:text-sm">
					<span>
						{format(contest.contestStartDate, "h:mm b") +
							" - " +
							format(contest.contestEndDate, "h:mm b")}
					</span>
					<span>{contest.contestDuration / 60} mins</span>
					{isContestLive && (
						<div className="flex items-baseline justify-center gap-1 animate-pulse">
							<Circle
								weight="fill"
								size={8}
								className="fill-green-600"
							/>
							<span className="text-green-600">now</span>
						</div>
					)}
					{isFuture(contest.contestStartDate) && (
						<span>
							{[
								days > 0 && days + "d",
								hours > 0 && hours + "h",
								minutes + "m",
							]
								.filter(Boolean)
								.join(" ")}{" "}
							left
						</span>
					)}
				</div>
			</div>
		</li>
	);
}
