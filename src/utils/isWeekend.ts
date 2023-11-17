import { StartDays } from "@/constants/startDays"

import { getDayOfTheWeek } from "./getMonthDays"

export const isWeekend = (
  year: number,
  month: number,
  date: number,
  startOfWeek: StartDays,
) => {
  const day = getDayOfTheWeek(new Date(year, month, date), startOfWeek)
  return day === 5 || day === 6
}
