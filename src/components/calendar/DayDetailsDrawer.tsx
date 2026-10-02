import { format } from "date-fns";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
} from "@/components/ui/drawer";
import { type Day } from "@/types";
import ContestListItem from "@/components/ContestListItem";

type DayDetailsDrawerProps = {
	day: Day | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function DayDetailsDrawer({
	day,
	open,
	onOpenChange,
}: DayDetailsDrawerProps) {
	const contests = day?.contests ?? [];

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent className="bg-neutral-950 border-neutral-800 text-neutral-200">
				<DrawerHeader className="text-left">
					<DrawerTitle className="text-neutral-200">
						{day?.date ? format(day.date, "dd MMM yyyy") : "No date selected"}
					</DrawerTitle>
					<DrawerDescription className="text-neutral-500">
						{contests.length > 0
							? `${contests.length} contest${contests.length > 1 ? "s" : ""} on this day`
							: "No contests on this day."}
					</DrawerDescription>
				</DrawerHeader>
				<div className="px-4 pb-4 max-h-[50vh] overflow-y-auto">
					{contests.length > 0 ? (
						<ul className="flex flex-col gap-2 pb-2">
							{contests.map((contest) => (
								<ContestListItem key={contest._id} contest={contest} />
							))}
						</ul>
					) : (
						<p className="pb-4 text-sm text-neutral-500">No contests.</p>
					)}
				</div>
			</DrawerContent>
		</Drawer>
	);
}
