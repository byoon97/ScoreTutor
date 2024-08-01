import { format, startOfMonth, endOfMonth, eachDayOfInterval, eachMonthOfInterval, addDays, subDays, isSameMonth, isBefore, parseISO } from "date-fns";

export type UnitData = {
  date: string;
  netUnits: number;
};

const addOneDay = (date: Date): Date => {
  return new Date(date.getTime() + 86400000); // Adding one day in milliseconds
};

export const getLabelsForMostRecent = (units: UnitData[]): string[] => {
  const recentUnits = units.slice(-7);

  // Add one day to each date and format the labels
  return recentUnits.map(unit => {
    const date = new Date(unit.date);
    const adjustedDate = addDays(date, 1); // Add one day to the date
    return format(adjustedDate, "MMM dd");
  });
};

export const getDataForMostRecent = (units: UnitData[]): number[] => {
  // Get the most recent 8 entries
  const recentUnits = units.slice(-7);
    let cumulativeTotal = 0;
  return recentUnits.map(unit => {
    cumulativeTotal += unit.netUnits;
    return cumulativeTotal;
  });
};



export const getLabelsForCurrentMonth = (): string[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = subDays(now, 1); // Set end date to yesterday in local time
  const days = eachDayOfInterval({ start, end });

  return days
    .filter(date => isSameMonth(date, now))
    .map(date => format(date, "MMM dd"));
};
export const getDataForCurrentMonth = (units: UnitData[]): number[] => {
  const now = new Date();
  const start = startOfMonth(now);
  const end = now; // Set end date to today
  const days = eachDayOfInterval({ start, end });

  // Create a map of dates to net units for the current month
  const dataMap = new Map(
    units
      .filter(unit => isSameMonth(parseISO(unit.date), now))
      .map(unit => [format(parseISO(unit.date), "MMM dd"), unit.netUnits])
  );

  let cumulativeTotal = 0;

  // Generate cumulative data for each day in the current month
  return days
    .filter(date => isSameMonth(date, now))
    .map(date => {
      const formattedDate = format(date, "MMM dd");
      cumulativeTotal += dataMap.get(formattedDate) || 0;
      return cumulativeTotal;
    });
};

export const getLabelsForCurrentYear = (): string[] => {
  const now = new Date();
  const months = eachMonthOfInterval({
    start: new Date(now.getFullYear(), 0, 1),
    end: new Date(now.getFullYear(), 11, 31)
  });

  return months
    .filter(month => isBefore(month, now) || isSameMonth(month, now)) // Include current and past months
    .map(date => format(date, "MMM"));
};

export const getDataForCurrentYear = (units: UnitData[]): number[] => {
  const now = new Date();
  const months = eachMonthOfInterval({
    start: new Date(now.getFullYear(), 0, 1),
    end: new Date(now.getFullYear(), 11, 31)
  });

  // Create a shallow copy of the units array to sort it
  const sortedUnits = [...units].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Create a map to store cumulative net units per month
  const dataMap = new Map<string, number>();
  let cumulativeTotal = 0;

  // Calculate cumulative net units for each month
  sortedUnits.forEach(unit => {
    const unitDate = parseISO(unit.date);
    const monthKey = format(unitDate, "MMM");

    if (isBefore(unitDate, endOfMonth(now)) || isSameMonth(unitDate, now)) {
      cumulativeTotal += unit.netUnits;
      dataMap.set(monthKey, cumulativeTotal);
    }
  });

  // Initialize the result array with type
  const result: number[] = [];
  let runningTotal = 0;

  // Fill in the results for each month
  months.forEach(month => {
    const monthKey = format(month, "MMM");
    if (dataMap.has(monthKey)) {
      runningTotal = dataMap.get(monthKey)!;
    }
    result.push(runningTotal);
  });

  return result;
};

export const getLabelsForYTD = (units: UnitData[]): string[] => {
  return units.map(unit => format(parseISO(unit.date), 'MMM dd'));
};

export const getDataForYTD = (units: UnitData[]): number[] => {
  let cumulativeTotal = 0;
  return units.map(unit => {
    cumulativeTotal += unit.netUnits;
    return cumulativeTotal;
  });
};


export const calculateROI = (initialInvestment : number, netProfit : number ) : number => (netProfit / initialInvestment) * 100