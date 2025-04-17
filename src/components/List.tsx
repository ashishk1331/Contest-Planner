import { compareAsc, format } from "date-fns";
import { type Day, Contest } from "@/types";
import PlatformLogo from "./PlatformLogo";

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

	return (
		<ul className="flex flex-col gap-8">
			{Object.entries(contestsForList)
				.sort(([a], [b]) => compareAsc(a, b))
				.map(([key, value]) => (
					<span key={key + key} className="flex flex-col gap-2">
						<li key={key} className="text-neutral-600">
							{format(key, "dd MM yyyy")}
						</li>
						{value.map((cont) => (
							<li
								key={cont._id}
								className="w-full py-4 px-5 bg-neutral-900 rounded flex items-center gap-4"
							>
								<PlatformLogo platform={cont.platform} />
								<div className="flex flex-col items-start gap-2">
									<a
										href={cont.contestUrl}
										className="underline underline-offset-2"
									>
										{cont.contestName}
									</a>
									<div className="flex items-center gap-4 *:text-neutral-500 *:text-sm">
										<span>
											{format(
												cont.contestStartDate,
												"h b",
											) +
												" - " +
												format(
													cont.contestEndDate,
													"h b",
												)}
										</span>
										<span>
											{cont.contestDuration / 60} mins
										</span>
									</div>
								</div>
							</li>
						))}
					</span>
				))}
		</ul>
	);
}
