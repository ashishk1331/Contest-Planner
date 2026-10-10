import { isWithinInterval, parseISO } from "date-fns";
import type { Contest } from "@/types";

export function isContestLive(contest: Contest, now: Date = new Date()): boolean {
	try {
		return isWithinInterval(now, {
			start: parseISO(contest.contestStartDate),
			end: parseISO(contest.contestEndDate),
		});
	} catch {
		return false;
	}
}
