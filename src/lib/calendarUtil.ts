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

export function getCalendar(contests: Contest[]): Day[] {
  const pool: Record<string, Contest[]> = {};
  if (contests) {
    for (let contest of contests.filter((contest) =>
      ["leetcode", "codeforces", "codechef", "geeksforgeeks"].includes(
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

  const date = new Date();
  const start = startOfMonth(date);
  let end = endOfMonth(date);
  const calendar: Day[] = [];

  let previousEnd = previousSunday(start);
  while (!isSameDay(previousEnd, start)) {
    calendar.push({
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
    let nextEnd = nextSaturday(end);
    while (!isSameDay(end, nextEnd)) {
      calendar.push({
        filler: true,
      });
      end = addDays(end, 1);
    }
  }

  return calendar;
}
