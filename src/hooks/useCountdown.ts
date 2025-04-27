import { useEffect, useState } from "react";
import { intervalToDuration, isBefore, isPast } from "date-fns";

export function useCountdown(targetDate: Date) {
  if (isPast(targetDate)) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }
  const calculateDuration = () => {
    const now = new Date();

    if (isBefore(targetDate, now)) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    const duration = intervalToDuration({
      start: now,
      end: targetDate,
    });

    return {
      days: duration.days ?? 0,
      hours: duration.hours ?? 0,
      minutes: duration.minutes ?? 0,
      seconds: duration.seconds ?? 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateDuration);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateDuration());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}
