import { MouseEventHandler } from "react"

import { CellTypes } from "@/constants/cellTypes"
import { StartDays } from "@/constants/startDays"

export interface DateCell {
  year: number
  month: number
  date: number
  type: CellTypes
}
export interface IHolidayData {
  countryCode: string
  date: string
  fixed: boolean
  global: boolean
  localName: string
  name: string
  type: string
}

export interface ICalendarProps {
  startOfWeek: StartDays
  dates: DateCell[]
  selectedDate: string
  holidays: string[]
  setSelectedDateValue: (
    type: CellTypes,
    value: string,
  ) => MouseEventHandler<HTMLDivElement> | undefined
  includeWeekends: boolean
  includeHolidays?: boolean
  inputDate?: string
  day?: number
  year?: number
  month?: number
  renderInput?: () => JSX.Element
  renderTodoList?: () => JSX.Element
}
export interface ITodo {
  id: number
  description: string
  todoDate: string
}
