import React, { useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

import { Calendar } from "@/components/Calendar/Calendar"
import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"
import { StartDays } from "@/constants/startDays"
import { darkTheme, lightTheme } from "@/constants/theme"
import { Themes } from "@/constants/theme"
import { withLogic } from "@/hocs/withLogic"
import { withRangeLogic } from "@/hocs/withRangeLogic"
import { GlobalStyles } from "@/styles/globalStyles"
import { IDateProps } from "@/types/interfaces"
import { currentDate } from "@/utils/getCurrentDate"
import { getDateParts } from "@/utils/getDateParts"
import { getCalendarData } from "@/utils/getMonthDays"

export interface IDatePickerProps {
  startOfWeek: StartDays
  includeHolidays: boolean
  includeWeekends: boolean
  fromValue: string
  toValue: string
  theme: Themes
}

export const RangePicker = ({
  startOfWeek = StartDays.Monday,
  fromValue,
  toValue,
  includeHolidays,
  includeWeekends,
  theme = Themes.Dark,
}: IDatePickerProps) => {
  const [fromDate, setFromDate] = useState(fromValue || "01.01.2023")
  const [toDate, setToDate] = useState(toValue || "05.01.2023")
  const [isRenderingCalendar, setIsRenderingCalendar] = useState(true)
  const [inputDate, setInputDate] = useState(currentDate)
  const currentTheme = theme === Themes.Light ? lightTheme : darkTheme
  const { day, month, year } = getDateParts(inputDate)

  const [currDate, setCurrDate] = useState<IDateProps>({
    month,
    year,
  })

  const dates = useMemo(
    () => getCalendarData(currDate.year, currDate.month, startOfWeek),
    [currDate.year, currDate.month, startOfWeek],
  )

  const CalendarWithLogic = withLogic(Calendar, dates, day, month, year)
  const CalendarWithRangePicker = withRangeLogic(
    CalendarWithLogic,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    currDate,
    setCurrDate,
    isRenderingCalendar,
    setIsRenderingCalendar,
    inputDate,
    setInputDate,
  )

  return (
    <ErrorBoundary>
      <ThemeProvider theme={currentTheme}>
        <GlobalStyles />
        <CalendarWithRangePicker
          includeHolidays={includeHolidays}
          includeWeekends={includeWeekends}
          startOfWeek={startOfWeek}
        />
      </ThemeProvider>
    </ErrorBoundary>
  )
}
