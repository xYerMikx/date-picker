import { StartDays } from "@/constants/startDays"
import { DateCell } from "@/types/interfaces"

export const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate()

export const getCurrentMonthDays = (year: number, month: number, daysAmount: number) => {
  const cells: DateCell[] = []

  for (let i = 1; i <= daysAmount; i++) {
    cells.push({
      year,
      month,
      date: i,
      type: "current",
    })
  }
  return cells
}

export const getPrevMonthDays = (year: number, month: number, startOfWeek: StartDays) => {
  const cells: DateCell[] = []
  const prevMonth = month - 1
  const firstDayOfCurrMonth = new Date(year, prevMonth, 1).getDay()
  const prevMonthLastDay = new Date(year, prevMonth, 0).getDate()
  const diff = startOfWeek === StartDays.Monday ? 1 : 0
  const startingvalue = prevMonthLastDay - firstDayOfCurrMonth + diff + 1
  for (let i = startingvalue; i <= prevMonthLastDay; i++) {
    cells.push({
      year,
      month: prevMonth,
      date: i,
      type: "prev",
    })
  }
  return cells
}

export const getNextMonthDays = (year: number, month: number, startOfWeek: StartDays) => {
  const cells: DateCell[] = []
  const nextMonth = month + 1
  const lastDayOfCurrMonth = new Date(year, month, 0).getDay()
  const diff = 6 - lastDayOfCurrMonth
  const nextDays = startOfWeek === StartDays.Monday ? diff + 1 : diff
  for (let i = 1; i <= nextDays; i++) {
    cells.push({
      year,
      month: nextMonth,
      date: i,
      type: "next",
    })
  }
  return cells
}

export const getCalendarData = (year: number, month: number, startOfWeek: StartDays) => {
  const daysInMonth = getDaysInMonth(year, month)
  const currentDays = getCurrentMonthDays(year, month, daysInMonth)
  const prevDays = getPrevMonthDays(year, month, startOfWeek)
  const nextDays = getNextMonthDays(year, month, startOfWeek)

  return [...prevDays, ...currentDays, ...nextDays]
}
