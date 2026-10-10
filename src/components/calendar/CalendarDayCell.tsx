import { format } from "date-fns";
import type { HTMLAttributes, Ref } from "react";
import { twMerge } from "tailwind-merge";
import { type Day } from "@/types";
import { isContestLive } from "@/lib/contestUtil";
import PlatformLogo from "@/components/PlatformLogo";

type CalendarDayCellProps = {
	day: Day;
	onSelect: (day: Day) => void;
	isAnyContestLive?: boolean;
	ref?: Ref<HTMLDivElement>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSelect" | "isAnyContestLive">;

export default function CalendarDayCell({
	day,
	onSelect,
	isAnyContestLive,
	ref,
	...triggerProps
}: CalendarDayCellProps) {
	const { filler, date, contests, isToday } = day;

	const showSheen =
		isToday &&
		(isAnyContestLive || !!contests?.some((contest) => isContestLive(contest)));

	const distinctPlatforms = contests
		? [...new Set(contests.map((contest) => contest.platform))]
		: [];
	const showLogoGrid = distinctPlatforms.length >= 2;

	return (
		<div
			{...triggerProps}
			ref={ref}
			onClick={(e) => {
				triggerProps.onClick?.(e);
				onSelect(day);
			}}
			className={twMerge(
				"w-full h-full aspect-square lg:aspect-auto col-span-1 rounded-xl md:rounded-2xl flex flex-col-reverse items-center p-1 text-neutral-300 border-2 border-transparent transition-all delay-70 text-[10px] md:text-base",
				showSheen && "live-sheen",
				isToday
					? "border-2 border-green-800 text-green-500 bg-green-800/12 md:hover:border-green-500"
					: filler
						? "text-neutral-500 bg-[repeating-linear-gradient(30deg,#171717_0px,#171717_2px,transparent_2px,transparent_6px)]"
						: "bg-neutral-900 md:hover:border-neutral-500 max-md:cursor-pointer max-md:active:scale-95",
				triggerProps.className,
			)}
		>
			{date && format(date, "d")}
			{!filler && date && contests && contests.length > 0 && (
				<div
					className={twMerge(
						"flex m-auto items-center gap-2",
						showLogoGrid && "lg:hidden",
					)}
				>
					<PlatformLogo platform={contests[0].platform} />
					{contests.length > 1 && (
						<span className="hidden md:inline-flex items-center rounded-md bg-green-950 px-1.5 py-0.5 text-sm font-medium text-green-100">
							+{contests.length - 1}
						</span>
					)}
				</div>
			)}
			{!filler && date && contests && contests.length > 0 && showLogoGrid && (
				<div className="m-auto hidden lg:grid grid-cols-2 gap-x-4 gap-y-3 items-center justify-items-center">
					{distinctPlatforms.map((platform, index) => (
						<span
							key={platform}
							className={
								distinctPlatforms.length % 2 === 1 &&
								index === distinctPlatforms.length - 1
									? "col-span-2 justify-self-center"
									: undefined
							}
						>
							<PlatformLogo platform={platform} />
						</span>
					))}
				</div>
			)}
		</div>
	);
}
