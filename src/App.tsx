import {
  addDays,
  endOfMonth,
  format,
  previousSunday,
  startOfMonth,
  isSameDay,
  nextSaturday,
  isToday,
} from "date-fns";
import { twMerge } from "tailwind-merge";
import Leetcode from "./logos/Leetcode";
import { useEffect, useState } from "react";
import CodeForces from "./logos/CodeForces";
import List from "./components/List";

type Day = {
  filler: boolean;
  date?: Date;
  day?: number;
  isToday?: boolean;
  contests?: string[];
};

type Contest = {
  contestStartDate: string;
  platform: string;
};

function getCalendar(contests: Contest[]): Day[] {
  const pool: Record<string, string[]> = {};
  if (contests) {
    for (let contest of contests) {
      const key = format(contest.contestStartDate, "yyyy-MM-dd");
      if (key in pool) {
        pool[key].push(contest.platform);
      } else {
        pool[key] = [contest.platform];
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
          ? pool[format(nextDay, "yyyy-MM-dd")]
          : [],
    });
  }

  let nextEnd = nextSaturday(end);
  while (!isSameDay(end, nextEnd)) {
    calendar.push({
      filler: true,
    });
    end = addDays(end, 1);
  }

  return calendar;
}

function App() {
  const days = ["SUN", "MON", "TUE", "WED", "THR", "FRI", "SAT"];
  const date = new Date();
  const start = startOfMonth(date);
  const end = endOfMonth(date);

  const [calendar, setCalender] = useState<Array<Day>>(getCalendar([]));

  useEffect(() => {
    async function getContests() {
      const response = await fetch(
        `https://node.codolio.com/api/contest-calendar/v1/all/get-contests?startDate=${start.toJSON()}&endDate=${end.toJSON()}`,
      );
      if (response.ok) {
        const contests = await response.json();
        setCalender(getCalendar(contests.data));
      }
    }

    getContests();
  }, []);

  return (
    <div className="container mx-auto max-w-xl min-h-screen w-full flex flex-col gap-8 h-fit my-24 p-4 md:p-0">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-neutral-200 font-mono">
          {format(date, "MMM yyyy").toUpperCase()}
        </h1>
      </div>

      <div className="w-full grid grid-cols-7 gap-3 mb-12">
        {days.map((day, index) => (
          <span
            key={index}
            className="p-1 py-2 w-full rounded-lg bg-neutral-900 text-center text-xs font-medium"
          >
            {day}
          </span>
        ))}
        {calendar.map(({ filler, date, contests, isToday }, index) => (
          <div
            key={index}
            className={twMerge(
              "w-full h-full aspect-square col-span-1 rounded-xl flex flex-col-reverse items-center p-1 text-neutral-300 border-2 border-transparent transition-all delay-70",
              isToday
                ? "border-2 border-green-800 md:hover:border-green-500"
                : filler
                  ? "bg-neutral-950"
                  : "bg-neutral-900 md:hover:border-neutral-500",
            )}
          >
            {!filler && date && contests ? (
              <>
                {format(date, "dd")}
                <div className="hidden md:flex m-auto items-center gap-1">
                  {contests.includes("leetcode") ? <Leetcode /> : null}
                  {contests.includes("codeforces") ? <CodeForces /> : null}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>

      <List calendar={calendar} />
    </div>
  );
}

export default App;
