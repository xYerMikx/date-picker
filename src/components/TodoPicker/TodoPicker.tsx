import React, { useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

import { StartDays } from "@/constants/startDays"
import { lightTheme } from "@/constants/theme"
import { withInputAndControlsLogic } from "@/hocs/withInputLogic"
import { withLogic } from "@/hocs/withLogic"
import { withTodoList } from "@/hocs/withTodoList"
import { currentDate } from "@/utils/getCurrentDate"
import { getDateParts } from "@/utils/getDateParts"
import { getCalendarData } from "@/utils/getMonthDays"

import { Calendar } from "../Calendar/Calendar"
import { ErrorBoundary } from "../ErrorBoundary/ErrorBoundary"

export interface ITodoPickerProps {
  value: string
  startOfWeek: StartDays
  includeHolidays: boolean
  includeWeekends: boolean
}
export const TodoPicker = ({
  value,
  startOfWeek = StartDays.Monday,
  includeHolidays = true,
  includeWeekends = true,
}: ITodoPickerProps) => {
  const [inputDate, setInputDate] = useState(value || currentDate)
  const [selectedDate, setSelectedDate] = useState(value || inputDate)

  const { day, month, year } = getDateParts(inputDate)

  const dates = useMemo(
    () => getCalendarData(year, month, startOfWeek),
    [year, month, startOfWeek],
  )

  const CalendarWithLogic = withLogic(Calendar, dates, day, month, year)
  const CalendarWithInputAndControls = withInputAndControlsLogic(
    CalendarWithLogic,
    inputDate,
    setInputDate,
    selectedDate,
    setSelectedDate,
  )
  const CalendarWithTodo = withTodoList(CalendarWithInputAndControls)
  return (
    <div>
      <ErrorBoundary>
        <ThemeProvider theme={lightTheme}>
          <CalendarWithTodo
            includeHolidays={includeHolidays}
            includeWeekends={includeWeekends}
            startOfWeek={startOfWeek}
            selectedDate={selectedDate}
          />
        </ThemeProvider>
      </ErrorBoundary>
    </div>
  )
}
