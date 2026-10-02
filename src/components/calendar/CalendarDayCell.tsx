import { format } from "date-fns";
import type { HTMLAttributes, Ref } from "react";
import { twMerge } from "tailwind-merge";
import { type Day } from "@/types";
import PlatformLogo from "@/components/PlatformLogo";

type CalendarDayCellProps = {
	day: Day;
	onSelect: (day: Day) => void;
	ref?: Ref<HTMLDivElement>;
} & Omit<HTMLAttributes<HTMLDivElement>, "onSelect">;

export default function CalendarDayCell({
	day,
	onSelect,
	ref,
	...triggerProps
}: CalendarDayCellProps) {
	const { filler, date, contests, isToday } = day;

	return (
		<div
			{...triggerProps}
			ref={ref}
			onClick={(e) => {
				triggerProps.onClick?.(e);
				onSelect(day);
			}}
			className={twMerge(
				"w-full h-full aspect-square col-span-1 rounded-xl md:rounded-2xl flex flex-col-reverse items-center p-1 text-neutral-300 border-2 border-transparent transition-all delay-70 text-[10px] md:text-base",
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
				<div className="flex m-auto items-center gap-2">
					<PlatformLogo platform={contests[0].platform} />
					{contests.length > 1 && (
						<span className="hidden md:inline-flex items-center rounded-md bg-green-950 px-1.5 py-0.5 text-sm font-medium text-green-100">
							+{contests.length - 1}
						</span>
					)}
				</div>
			)}
		</div>
	);
}
