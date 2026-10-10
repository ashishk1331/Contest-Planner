import {
  addDays,
  endOfMonth,
  format,
  previousSunday,
  startOfMonth,
  isSameDay,
  nextSaturday,
  isToday,
  compareAsc,
} from "date-fns";
import { type Day, Contest } from "@/types";

export function getCalendar(contests: Contest[], anchorDate: Date): Day[] {
  const pool: Record<string, Contest[]> = {};
  if (contests) {
    for (const contest of contests.filter((contest) =>
      ["leetcode", "codeforces", "codechef", "geeksforgeeks", "atcoder"].includes(
        contest.platform,
      ),
    )) {
      const key = format(contest.contestStartDate, "yyyy-MM-dd");
      if (key in pool) {
        pool[key].push(contest);
      } else {
        pool[key] = [contest];
      }
    }
  }

  const start = startOfMonth(anchorDate);
  let end = endOfMonth(anchorDate);
  const calendar: Day[] = [];

  let previousEnd = previousSunday(start);
  while (!isSameDay(previousEnd, start)) {
    calendar.push({
      date: previousEnd,
      day: previousEnd.getDay(),
      filler: true,
    });
    previousEnd = addDays(previousEnd, 1);
  }

  for (let i = 0; i < end.getDate(); i++) {
    const nextDay = addDays(start, i);
    calendar.push({
      date: nextDay,
      day: nextDay.getDay(),
      isToday: isToday(nextDay),
      filler: false,
      contests:
        format(nextDay, "yyyy-MM-dd") in pool
          ? pool[format(nextDay, "yyyy-MM-dd")].sort((a, b) =>
              compareAsc(a.contestStartDate, b.contestStartDate),
            )
          : [],
    });
  }

  if (calendar.length % 7 != 0) {
    const nextEnd = nextSaturday(end);
    while (!isSameDay(end, nextEnd)) {
      calendar.push({
        date: nextEnd,
        day: nextEnd.getDay(),        
        filler: true,
      });
      end = addDays(end, 1);
    }
  }

  return calendar;
}
