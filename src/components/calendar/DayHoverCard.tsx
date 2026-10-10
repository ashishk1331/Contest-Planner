import { format } from "date-fns";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/components/ui/hover-card";
import { type Day } from "@/types";
import CalendarDayCell from "./CalendarDayCell";
import ContestLink from "./ContestLink";

type DayHoverCardProps = {
	day: Day;
	onSelect: (day: Day) => void;
	isAnyContestLive?: boolean;
};

export default function DayHoverCard({
	day,
	onSelect,
	isAnyContestLive,
}: DayHoverCardProps) {
	const { filler, date, contests } = day;

	return (
		<HoverCard>
			<HoverCardTrigger asChild>
				<CalendarDayCell
					day={day}
					onSelect={onSelect}
					isAnyContestLive={isAnyContestLive}
				/>
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
								{contests.map((contest) => (
									<li
										key={contest._id}
										className="flex items-center gap-2"
									>
										<ContestLink contest={contest} />
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
	);
}
