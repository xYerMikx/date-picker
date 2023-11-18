import React, { ChangeEvent, useEffect, useMemo, useState } from "react"
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

import {
  CalendarContainer,
  Cell,
  CurrentDateContainer,
  MonthButton,
  Wrapper,
  YearButton,
} from "./styled"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { formatDate } from "@/utils/formatDate"

export interface IDatePickerProps {
  startOfWeek: StartDays
}

export const DatePicker = ({ startOfWeek = StartDays.Monday }: IDatePickerProps) => {
  const [inputDate, setInputDate] = useState<string>(currentDate)
  const [selectedDate, setSelectedDate] = useState<string>(inputDate)
  const { day, month, year } = getDateParts(inputDate)

  useEffect(() => {
    setSelectedDate(inputDate)
  }, [inputDate])
  const handleEnterPress = (inputValue: string) => {
    setSelectedDate(inputValue)
    setInputDate(inputValue)
  }

  const incrementYear = () => {
    const incrementedYear = year + 1
    const newDate = `${day}.${month}.${incrementedYear}`
    setInputDate(newDate)
  }

  const decrementYear = () => {
    const decrementedYear = year - 1
    const newDate = `${day}.${month}.${decrementedYear}`
    setInputDate(newDate)
  }

  const incrementMonth = () => {
    const incrementedMonth = (month % 12) + 1
    const formatedMonth =
      incrementedMonth < 10 ? "0" + incrementedMonth : incrementedMonth
    const newDate = `${day}.${formatedMonth}.${year}`
    setInputDate(newDate)
  }

  const decrementMonth = () => {
    const decrementedMonth = month === 1 ? 12 : month - 1
    const formatedMonth =
      decrementedMonth < 10 ? "0" + decrementedMonth : decrementedMonth
    const newDate = `${day}.${formatedMonth}.${year}`
    setInputDate(newDate)
  }
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
        <Wrapper>
          <Input onPressEnter={handleEnterPress} value={selectedDate} />
          <CurrentDateContainer>
            <YearButton onClick={decrementYear}>&lt;&lt;</YearButton>
            <MonthButton onClick={decrementMonth}>&lt; </MonthButton>
            <p>{formatDate(inputDate)}</p>
            <MonthButton onClick={incrementMonth}>&gt; </MonthButton>
            <YearButton onClick={incrementYear}>&gt;&gt; </YearButton>
          </CurrentDateContainer>
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
                  key={`${date}-${month}-${year}`}
                >
                  {date}
                </Cell>
              )
            })}
          </CalendarContainer>
        </Wrapper>
      </ThemeProvider>
    </ErrorBoundary>
  )
}
