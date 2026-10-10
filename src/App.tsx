import { endOfMonth, format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import List from "./components/List";
import { getCalendar } from "./lib/calendarUtil";
import Calendar from "./components/Calendar";
import { type Day } from "./types";

function App() {
  const [date] = useState(() => new Date());

  const [calendar, setCalender] = useState<Array<Day>>(() =>
    getCalendar([], date),
  );

  useEffect(() => {
    async function getContests() {
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?startDate=${start.toJSON()}&endDate=${end.toJSON()}`,
      );
      if (response.ok) {
        const contests = await response.json();
        setCalender(getCalendar(contests.data, date));
      }
    }

    getContests();
  }, [date]);

  return (
    <div className="mx-auto w-full min-h-screen flex flex-col gap-8 my-16 lg:my-0 p-4 md:p-0 lg:px-10 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-8 flex flex-col gap-8 lg:h-[calc(100vh-4rem)]">
            <div className="flex items-center justify-between shrink-0">
              <h1 className="text-2xl md:text-4xl font-bold text-neutral-200">
                {format(date, "MMMM yyyy")}
              </h1>
              <h1 className="text-2xl md:text-4xl font-bold text-neutral-200">{calendar.reduce(
                  (prev, cur) => prev + (cur.contests?.length ?? 0),
                  0,
                )}
              </h1>
            </div>
            <Calendar calendar={calendar} />
            {calendar && calendar.length > 0 && (
              <span className="w-full shrink-0 text-center text-neutral-600 cursor-pointer block">
                made by{" "}
                <a
                  href="https://github.com/ashishk1331/"
                  className="underline underline-offset-4"
                >
                  @ashishk1331
                </a>
              </span>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 min-w-0">
          <List calendar={calendar} />
        </div>
      </div>
    </div>
  );
}

export default App;
