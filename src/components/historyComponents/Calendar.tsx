import React, { useState } from "react";
import {
  isSameDay,
  format,
  getDate,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  parse,
  isWithinInterval,
} from "date-fns";
import "../../app/css/Calendar.css";

interface DailyUnit {
  id: number;
  date: Date;
  netUnits: number;
  unitCountId: number;
}

interface Props {
  dailyUnits: DailyUnit[];
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const CustomCalendar: React.FC<Props> = ({ dailyUnits }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = parse(event.target.value, "MMMM yyyy", new Date());
    setCurrentMonth(selectedMonth);
  };

  const currentMonthStart = startOfMonth(currentMonth);
  const currentMonthEnd = endOfMonth(currentMonth);
  const daysInMonth = eachDayOfInterval({
    start: currentMonthStart,
    end: currentMonthEnd,
  });

  const getDayContent = (date: Date) => {
    const unit = dailyUnits.find((d) => isSameDay(d.date, date));
    const isToday = isSameDay(date, new Date());
    const backgroundColor = unit
      ? unit.netUnits > 0
        ? "bg-[#324E1C]"
        : "bg-[#530D0A]"
      : "";
    const borderColor = isToday ? "border-blue-500" : "";

    return (
      <div
        className={`flex flex-col items-center justify-center w-full h-full ${backgroundColor} ${borderColor} rounded-lg font-thiner text-[12px] p-2`}
      >
        <div>{getDate(date)}</div>
        {unit && (
          <div className="font-semibold">
            {unit.netUnits.toFixed(2)}
            <span>u</span>
          </div>
        )}
      </div>
    );
  };

  const totalNetUnits = dailyUnits
    .filter((d) =>
      isWithinInterval(d.date, {
        start: currentMonthStart,
        end: currentMonthEnd,
      })
    )
    .reduce((acc, curr) => acc + curr.netUnits, 0);

  return (
    <div className="flex-1 p-3 md:p-6 bg-[#142230] text-white rounded-lg shadow-lg font-sans">
      <div className="mb-5 flex flex-row items-center justify-between">
        <div className="relative flex items-center">
          <select
            value={format(currentMonth, "MMMM yyyy")}
            onChange={handleMonthChange}
            className="bg-[#142230] text-white rounded-lg px-4 py-2 font-sans font-semibold text-lg"
          >
            {months.map((month) => (
              <option
                key={month}
                value={`${month} ${format(currentMonth, "yyyy")}`}
              >
                {month} {format(currentMonth, "yyyy")}
              </option>
            ))}
          </select>
        </div>
        <div className="text-base text-brand-gray-9 text-gray-300">
          Monthly Profit:{" "}
          <span
            className={totalNetUnits > 0 ? "text-green-400" : "text-red-400"}
          >
            {totalNetUnits} Units
          </span>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-x-1 gap-y-1">
        {daysOfWeek.map((d, idx) => (
          <div key={idx} className="text-sm text-center text-brand-gray-6">
            {d}
          </div>
        ))}
        {daysInMonth.map((date, idx) => (
          <div
            key={idx}
            className="hover:bg-brand-gray-3 opacity-90 rounded-lg text-brand-gray-9"
          >
            <div className="text-sm mb-0.5 text-center text-brand-gray-7">
              {getDayContent(date)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
