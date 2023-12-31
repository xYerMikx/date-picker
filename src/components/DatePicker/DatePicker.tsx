import React, { useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

import { Calendar } from "@/components/Calendar/Calendar"
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"
import { StartDays } from "@/constants/startDays"
import { darkTheme, lightTheme } from "@/constants/theme"
import { Themes } from "@/constants/theme"
import { withInputAndControlsLogic } from "@/hocs/withInputLogic"
import { withLogic } from "@/hocs/withLogic"
import { GlobalStyles } from "@/styles/globalStyles"
import { currentDate } from "@/utils/getCurrentDate"
import { getDateParts } from "@/utils/getDateParts"
import { getCalendarData } from "@/utils/getMonthDays"

export interface IDatePickerProps {
  startOfWeek: StartDays
  includeHolidays: boolean
  includeWeekends: boolean
  value: string
  theme: Themes
  min?: string
  max?: string
}

export const DatePicker = ({
  startOfWeek = StartDays.Monday,
  value,
  includeHolidays,
  includeWeekends,
  theme = Themes.Dark,
  min = "",
  max = "",
}: IDatePickerProps) => {
  const [inputDate, setInputDate] = useState(value || currentDate)
  const [selectedDate, setSelectedDate] = useState(value || inputDate)
  const [isRenderingCalendar, setIsRenderingCalendar] = useState(true)

  const currentTheme = theme === Themes.Light ? lightTheme : darkTheme

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
    isRenderingCalendar,
    setIsRenderingCalendar,
    max,
    min,
  )

  return (
    <ErrorBoundary>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <CalendarWithInputAndControls
          data-testid="date-picker"
          includeHolidays={includeHolidays}
          includeWeekends={includeWeekends}
          startOfWeek={startOfWeek}
          selectedDate={selectedDate}
        />
      </ThemeProvider>
    </ErrorBoundary>
  )
}
