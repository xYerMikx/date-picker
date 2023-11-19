import { CellTypes } from "@/constants/cellTypes"
import { StartDays } from "@/constants/startDays"
import { DateCell } from "@/types/interfaces"

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate()

const getMonthDays = (
  year: number,
  month: number,
  startDay: number,
  endDay: number,
  type: CellTypes,
) => {
  const cells: DateCell[] = []
  for (let i = startDay; i <= endDay; i++) {
    cells.push({
      year,
      month,
      date: i,
      type,
    })
  }
  return cells
}

export const getCalendarData = (year: number, month: number, startOfWeek: StartDays) => {
  const daysInMonth = getDaysInMonth(year, month)
  const currentDays = getMonthDays(year, month, 1, daysInMonth, CellTypes.Current)

  //логика расчета предыдущих чисел заполнения
  const prevMonth = month - 1
  const firstDayOfCurrMonth = new Date(year, prevMonth, 1).getDay()
  const diff =
    StartDays.Monday === startOfWeek && firstDayOfCurrMonth === 0
      ? 6
      : firstDayOfCurrMonth - 1
  const prevMonthLastDay = new Date(year, prevMonth, 0).getDate()
  const startingValue =
    StartDays.Monday === startOfWeek
      ? prevMonthLastDay - diff + 1
      : prevMonthLastDay - firstDayOfCurrMonth + 1
  const prevDays = getMonthDays(
    year,
    prevMonth,
    startingValue,
    prevMonthLastDay,
    CellTypes.Prev,
  )

  //логика расчета следующих чисел заполнения
  const nextMonth = month + 1
  const lastDayOfCurrMonth = new Date(year, month, 0).getDay()
  const nextDaysDiff = 7 - lastDayOfCurrMonth
  const nextDays = getMonthDays(
    year,
    nextMonth,
    1,
    startOfWeek === StartDays.Monday ? nextDaysDiff : nextDaysDiff - 1,
    CellTypes.Next,
  )

  return [...prevDays, ...currentDays, ...nextDays]
}
