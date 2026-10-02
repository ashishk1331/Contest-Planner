import { format, isFuture, isPast, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { Circle } from "@phosphor-icons/react";
import { twMerge } from "tailwind-merge";
import { type Contest } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";
import PlatformLogo from "./PlatformLogo";

type ContestListItemProps = {
	contest: Contest;
};

export default function ContestListItem({ contest }: ContestListItemProps) {
	const today = new Date();
	const contestStart = parseISO(contest.contestStartDate);
	const contestEnd = parseISO(contest.contestEndDate);

	const isContestLive = isWithinInterval(today, {
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
						isPast(contest.contestEndDate) &&
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
