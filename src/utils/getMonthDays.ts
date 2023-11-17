import { StartDays } from "@/constants/startDays"

import { getDaysInMonth } from "./getDaysInMonth"

const sundayWeekToMondayWeekDayMap: Record<number, number> = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5,
}

export const getDayOfTheWeek = (date: Date, startOfWeek: StartDays) => {
  const day = date.getDay()

  return startOfWeek === StartDays.Sunday ? day : sundayWeekToMondayWeekDayMap[day]
}
export const getCurrentMonthDays = (
  year: number,
  month: number,
  numberOfDays: number,
) => {
  const dateCells = []

  for (let i = 1; i <= numberOfDays; i++) {
    dateCells.push({
      year,
      month,
      date: i,
      type: "current",
    })
  }

  return dateCells
}
export const getPrevMonthDays = (year: number, month: number, startOfWeek: StartDays) => {
  const currentMonthFirstDay = new Date(year, month, 1)
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay, startOfWeek)

  const daysAmountInPrevMonth = getDaysInMonth(year, month - 1)

  const dateCells = []

  const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month - 1]

  for (let i = prevMonthCellsAmount - 1; i >= 0; i--) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: daysAmountInPrevMonth - i,
      type: "prev",
    })
  }

  return dateCells
}

export const getNextMonthDays = (year: number, month: number, startOfWeek: StartDays) => {
  const currentMonthFirstDay = new Date(year, month, 1)
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay, startOfWeek)

  const daysAmount = getDaysInMonth(year, month)

  const nextMonthDays = 42 - daysAmount - prevMonthCellsAmount

  const [cellYear, cellMonth] = month === 11 ? [year + 1, 0] : [year, month + 1]

  const dateCells = []

  for (let i = 1; i <= nextMonthDays; i++) {
    dateCells.push({
      year: cellYear,
      month: cellMonth,
      date: i,
      type: "next",
    })
  }

  return dateCells
}
