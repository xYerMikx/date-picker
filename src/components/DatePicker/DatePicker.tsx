import React, { useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

import { Calendar } from "@/components/Calendar/Calendar"
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"
import { CellTypes } from "@/constants/cellTypes"
import { StartDays } from "@/constants/startDays"
import { lightTheme } from "@/constants/theme"
import { withLogic } from "@/hocs/withLogic"
import { currentDate } from "@/utils/getCurrentDate"
import { withInputAndControlsLogic } from "@/hocs/withInputLogic"
import { getDateParts } from "@/utils/getDateParts"
import { getCalendarData } from "@/utils/getMonthDays"

export interface IDatePickerProps {
  startOfWeek: StartDays
  min?: string
  max?: string
  includeHolidays: boolean
  includeWeekends: boolean
}

export const DatePicker = ({
  startOfWeek = StartDays.Monday,
  includeHolidays,
  includeWeekends,
}: IDatePickerProps) => {
  const [inputDate, setInputDate] = useState<string>(currentDate)
  const [selectedDate, setSelectedDate] = useState<string>(inputDate)

  const { day, month, year } = getDateParts(inputDate)

  const dates = useMemo(
    () => getCalendarData(year, month, startOfWeek),
    [year, month, startOfWeek],
  )

  useEffect(() => {
    setSelectedDate(inputDate)
  }, [inputDate])

  const CalendarWithLogic = withLogic(Calendar, dates, day, month, year)
  const CalendarWithInputAndControls = withInputAndControlsLogic(
    CalendarWithLogic,
    inputDate,
    setInputDate,
    selectedDate,
    setSelectedDate,
  )

  return (
    <ErrorBoundary>
      <ThemeProvider theme={lightTheme}>
        <CalendarWithInputAndControls
          includeHolidays={includeHolidays}
          includeWeekends={includeWeekends}
          startOfWeek={startOfWeek}
          selectedDate={selectedDate}
        />
      </ThemeProvider>
    </ErrorBoundary>
  )
}
