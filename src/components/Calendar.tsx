import { format, getDay } from "date-fns";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { twMerge } from "tailwind-merge";
import { type Day } from "@/types";
import PlatformLogo from "./PlatformLogo";

type CalendarProps = {
	calendar: Day[];
};

export default function Calendar({ calendar }: CalendarProps) {
	const days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];

	return (
		<div className="w-full grid grid-cols-7 gap-1 mb-12">
			{days.map((day, index) => (
				<span
					key={index}
					className={twMerge(
						"p-1 py-2 w-full rounded-lg bg-neutral-900 text-center text-xs font-medium",
						getDay(new Date()) === index && "bg-neutral-800",
					)}
				>
					{day}
				</span>
			))}
			{calendar.map(({ filler, date, contests, isToday }, index) => (
				<HoverCard key={index}>
					<HoverCardTrigger>
						<div
							key={index}
							className={twMerge(
								"w-full h-full aspect-square col-span-1 rounded-lg md:rounded-xl flex flex-col-reverse items-center p-1 text-neutral-300 border-2 border-transparent transition-all delay-70 text-[10px] md:text-base",
								isToday
									? "border-2 border-green-800 md:hover:border-green-500"
									: filler
										? "bg-transparent"
										: "bg-neutral-900 md:hover:border-neutral-500",
							)}
						>
							{date && format(date, "d")}

							{!filler &&
								date &&
								contests &&
								contests.length > 0 && (
									<div className="flex m-auto items-center gap-2">
										<PlatformLogo
											platform={contests[0].platform}
										/>
										{contests.length > 1 && (
											<span className="hidden md:inline-flex items-center rounded-md bg-green-950 px-1.5 py-0.5 text-sm font-medium text-green-100">
												+{contests.length - 1}
											</span>
										)}
									</div>
								)}
						</div>
					</HoverCardTrigger>
					{!filler && (
						<HoverCardContent className="border-none text-neutral-200 bg-neutral-800">
							{contests && contests.length > 0 ? (
								<div className="flex flex-col gap-1 items-start pb-2">
									{date && (
										<span className="mb-4 text-neutral-500">
											{format(date, "dd MMM yyyy")}
										</span>
									)}
									<ul className="flex flex-col items-start gap-3">
										{contests.map((cont, index) => (
											<li
												key={index}
												className="flex items-center gap-2"
											>
												<PlatformLogo
													platform={cont.platform}
												/>
												<a
													href={cont.contestUrl}
													target="_blank"
													className="underline underline-offset-2"
												>
													{cont.contestName}
												</a>
											</li>
										))}
									</ul>
								</div>
							) : (
								<p>No contests.</p>
							)}
						</HoverCardContent>
					)}
				</HoverCard>
			))}
		</div>
	);
}
