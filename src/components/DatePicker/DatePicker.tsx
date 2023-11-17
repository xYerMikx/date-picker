import React, { ChangeEvent, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"
import { Input } from "@/components/Input/Input"
import { days } from "@/constants/days"
import { StartDays } from "@/constants/startDays"
import { lightTheme } from "@/constants/theme"
import { currentDate } from "@/utils/getCurrentDate"
import { getDateParts } from "@/utils/getDateParts"

import { getCalendarData } from "@/utils/getMonthDays"
import { isWeekend } from "@/utils/isWeekend"

import { CalendarContainer, Cell, CurrentDate } from "./styled"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { DateCell } from "@/types/interfaces"

export interface IDatePickerProps {
  startOfWeek?: StartDays
  value: string
}

export const DatePicker = ({
  value,
  startOfWeek = StartDays.Monday,
}: IDatePickerProps) => {
  const { day, month, year } = getDateParts(value)
  const [inputDate, setInputDate] = useState<string>(value)
  const changeInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value)
  }
  const [selectedDate, setSelectedDate] = useState<string | null>(inputDate)
  const setSelectedDateValue = (type: string, value: string) => () => {
    if (type === "current") {
      setSelectedDate(value)
      setInputDate(value)
    }
  }
  const dates = useMemo(() => {
    return getCalendarData(year, month, startOfWeek)
  }, [year, month, startOfWeek])
  return (
    <ErrorBoundary>
      <ThemeProvider theme={lightTheme}>
        <Input onChange={changeInputDate} value={inputDate} />
        <div>
          <CurrentDate>{currentDate}</CurrentDate>
          <CalendarContainer>
            {days[startOfWeek].map((month) => (
              <Cell key={month}>{month}</Cell>
            ))}
            {dates.map(({ date, year, month, type }) => {
              const dateValue = addLeadingZeros(year, month, date)
              const isSelected = selectedDate === dateValue && type === "current"
              const isNext = type === "next"
              const isPrev = type === "prev"
              const isWeekendCell = isWeekend(year, month, date)
              return (
                <Cell
                  data-selected={isSelected}
                  data-isweekend={isWeekendCell}
                  data-prev={isPrev}
                  data-next={isNext}
                  onClick={setSelectedDateValue(type, dateValue)}
                  key={`${date}-${month}`}
                >
                  {date}
                </Cell>
              )
            })}
          </CalendarContainer>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
