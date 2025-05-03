import { compareAsc, format, isFuture, isSameDay } from "date-fns";
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

	return (
		<ul className="flex flex-col gap-8">
			{Object.entries(contestsForList)
				.sort(([a], [b]) => compareAsc(a, b))
				.map(([key, value]) => (
					<span key={key + key} className="flex flex-col gap-2">
						<li
							key={key}
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
		</ul>
	);
}

function ListItem({ contest, today }: { contest: Contest; today: Date }) {
	const { days, hours, minutes, seconds } = useCountdown(
		new Date(contest.contestStartDate),
	);
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
					className="underline underline-offset-2"
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
					{isFuture(contest.contestStartDate) && (
						<span>
							{[
								days > 0 && days + "d",
								hours > 0 && hours + "h",
								minutes + "m",
								seconds + "s",
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
