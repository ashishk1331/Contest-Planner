import type { CSSProperties } from "react";
import { format, isFuture, isPast, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { type Contest } from "@/types";
import { useCountdown } from "@/hooks/useCountdown";
import { isContestLive } from "@/lib/contestUtil";
import PlatformLogo from "./PlatformLogo";

type ContestListItemProps = {
	contest: Contest;
	index?: number;
};

export default function ContestListItem({
	contest,
	index = 0,
}: ContestListItemProps) {
	const today = new Date();
	const contestStart = parseISO(contest.contestStartDate);
	const contestEnd = parseISO(contest.contestEndDate);

	const live = isContestLive(contest, today);
	const { days, hours, minutes } = useCountdown(contestStart);
	const endsIn = useCountdown(contestEnd);

	const msUntilStart = contestStart.getTime() - today.getTime();
	const startingReady =
		!live && msUntilStart > 0 && msUntilStart <= 15 * 60 * 1000;
	const startingSoon =
		!live &&
		!startingReady &&
		msUntilStart > 0 &&
		msUntilStart <= 60 * 60 * 1000;

	return (
		<li
			key={contest._id}
			className={twMerge(
				"w-full py-4 px-5 bg-neutral-900 rounded flex items-center gap-4",
				live && "live-sheen",
			)}
			style={
				live
					? ({ "--sheen-delay": `${index * 0.15}s` } as CSSProperties)
					: undefined
			}
		>
			<PlatformLogo platform={contest.platform} />
			<div className="flex flex-col items-start gap-2">
				{live || startingReady || startingSoon ? (
					<div className="flex items-center gap-2 flex-wrap">
						{live && (
							<span className="rounded border border-green-600/60 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-green-500">
								LIVE
							</span>
						)}
						{startingReady && (
							<span className="rounded border border-orange-600/60 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-orange-500">
								READY
							</span>
						)}
						{startingSoon && (
							<span className="rounded border border-amber-600/60 px-1.5 py-0.5 text-[10px] font-bold tracking-widest text-amber-500">
								SOON
							</span>
						)}
						<a
							href={contest.contestUrl}
							className="underline underline-offset-2"
						>
							{contest.contestName}
						</a>
					</div>
				) : (
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
				)}
				<div className="flex flex-wrap items-center gap-x-4 gap-y-2 *:text-neutral-500 *:text-sm">
					<span>
						{format(contest.contestStartDate, "h:mm b") +
							" - " +
							format(contest.contestEndDate, "h:mm b")}
					</span>
					<span>{contest.contestDuration / 60} mins</span>
					{live && (
						<span>
							ends in{" "}
							{[
								endsIn.hours > 0 && endsIn.hours + "h",
								endsIn.minutes + "m",
							]
								.filter(Boolean)
								.join(" ")}
						</span>
					)}
					{startingReady && (
						<span className="text-orange-600">
							starts in {minutes}m
						</span>
					)}
					{startingSoon && (
						<span className="text-amber-600">
							starts in {minutes}m
						</span>
					)}
					{!live &&
						!startingReady &&
						!startingSoon &&
						isFuture(contest.contestStartDate) && (
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
