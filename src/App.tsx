import { endOfMonth, format, startOfMonth } from "date-fns";
import { useEffect, useState } from "react";
import List from "./components/List";
import { getCalendar } from "./lib/calendarUtil";
import Calendar from "./components/Calendar";
import { type Day } from "./types";

function App() {
  const date = new Date();

  const [calendar, setCalender] = useState<Array<Day>>(getCalendar([]));

  useEffect(() => {
    async function getContests() {
      const start = startOfMonth(date);
      const end = endOfMonth(date);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}?startDate=${start.toJSON()}&endDate=${end.toJSON()}`,
      );
      if (response.ok) {
        const contests = await response.json();
        setCalender(getCalendar(contests.data));
      }
    }

    getContests();
  }, []);

  return (
    <div className="container mx-auto max-w-2xl min-h-screen w-full flex flex-col gap-8 h-fit my-16 p-4 md:p-0">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-4xl font-bold text-neutral-200">
          {format(date, "MMM yyyy").toUpperCase()}
        </h1>
        <h1 className="text-2xl md:text-4xl font-bold text-neutral-200">
          (
          {calendar.reduce(
            (prev, cur) => prev + (cur.contests?.length ?? 0),
            0,
          )}
          )
        </h1>
      </div>

      <Calendar calendar={calendar} />

      <List calendar={calendar} />

      {calendar && calendar.length > 0 && (
        <span className="w-full text-center text-neutral-600 cursor-pointer p-3">
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
  );
}

export default App;
