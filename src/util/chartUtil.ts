import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, addDays } from "date-fns";

export type UnitData = {
  date: string;
  netUnits: number;
};

const addOneDay = (date: Date): Date => {
  return addDays(date, 1);
};

export const getLabelsForMostRecent = (units: UnitData[]): string[] => {
  console.log(units)
  const recentUnits = units.slice(-8);
  // Remove the last element from the array (today's date)
  recentUnits.shift()
  // Format the dates for the labels using UTC
  return recentUnits.map(unit => format(new Date(Date.UTC(new Date(unit.date).getUTCFullYear(), new Date(unit.date).getUTCMonth(), new Date(unit.date).getUTCDate())), "MMM dd"));
};

export const getLabelsForCurrentYear = (): string[] => {
  const months = eachMonthOfInterval({
    start: new Date(new Date().getFullYear(), 0, 1),
    end: new Date(new Date().getFullYear(), 11, 31)
  });
  return months.map(date => format(date, "MMM"));
};

export const getLabelsForCurrentMonth = (): string[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1); // Set end date to yesterday in local time
  const days = eachDayOfInterval({ start, end });
  return days.map(date => format(addOneDay(date), "MMM dd"));
};

export const getDataForCurrentMonth = (units: UnitData[]): number[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 1)); // Set end date to yesterday in UTC
  const days = eachDayOfInterval({ start, end });
  const dataMap = new Map(units.map(unit => [format(new Date(unit.date), "MMM dd"), unit.netUnits]));

  let cumulativeTotal = 0;
  return days.map(date => {
    const formattedDate = format(date, "MMM dd");
    cumulativeTotal += dataMap.get(formattedDate) || 0;
    return cumulativeTotal;
  });
};

export const getDataForMostRecent = (units: UnitData[]): number[] => {
  // Get the most recent 8 entries
  const recentUnits = units.slice(-8);
  recentUnits.pop();

  let cumulativeTotal = 0;
  return recentUnits.map(unit => {
    cumulativeTotal += unit.netUnits;
    return cumulativeTotal;
  });
};

export const getDataForCurrentYear = (units: UnitData[]): number[] => {
  const months = eachMonthOfInterval({
    start: new Date(new Date().getFullYear(), 0, 1),
    end: new Date(new Date().getFullYear(), 11, 31)
  });
  const dataMap = new Map(units.map(unit => [format(new Date(unit.date), "MMM"), unit.netUnits]));

  return months.map(date => dataMap.get(format(date, "MMM")) || 0);
};

