import React, { useEffect, useMemo, useState } from "react"
import { ThemeProvider } from "styled-components"

import { ErrorBoundary } from "@/components/ErrorBoundary/ErrorBoundary"
import { Input } from "@/components/Input/Input"
import { days } from "@/constants/days"
import { StartDays } from "@/constants/startDays"
import { lightTheme } from "@/constants/theme"
import { formatDate, formatDateFromHolidays } from "@/utils/formatDate"
import { currentDate } from "@/utils/getCurrentDate"
import { getDateParts } from "@/utils/getDateParts"
import { getCalendarData } from "@/utils/getMonthDays"
import { isWeekend } from "@/utils/isWeekend"
import { addLeadingZeros } from "@/utils/leadingZeros"

import {
  CalendarContainer,
  Cell,
  CurrentDate,
  CurrentDateContainer,
  MonthButton,
  Wrapper,
  YearButton,
} from "./styled"
import { updateDate } from "@/utils/updateDate"
import { CellTypes } from "@/constants/cellTypes"
import { getHolidays } from "@/api/getHolidays"
import { IHolidayData } from "@/types/interfaces"
import { isHoliday } from "@/utils/isHoliday"

export interface IDatePickerProps {
  startOfWeek: StartDays
}

export const DatePicker = ({ startOfWeek = StartDays.Monday }: IDatePickerProps) => {
  const [inputDate, setInputDate] = useState<string>(currentDate)
  const [selectedDate, setSelectedDate] = useState<string>(inputDate)
  const [holidays, setHolidays] = useState<string[]>([])
  const { day, month, year } = getDateParts(inputDate)

  useEffect(() => {
    setSelectedDate(inputDate)
  }, [inputDate])

  useEffect(() => {
    const fetchData = async () => {
      const data = (await getHolidays(year)) as unknown as IHolidayData[]
      const datesArray = data.map(({ date }) => {
        const { day, month, year } = getDateParts(formatDateFromHolidays(date))
        return addLeadingZeros(year, day, month)
      })
      setHolidays(datesArray)
    }
    fetchData()
  }, [year])

  const handleEnterPress = (inputValue: string) => {
    setSelectedDate(inputValue)
    setInputDate(inputValue)
  }

  const incrementYear = () => {
    const incrementedYear = year + 1
    const newDate = addLeadingZeros(incrementedYear, month, day)
    setInputDate(newDate)
  }

  const decrementYear = () => {
    const decrementedYear = year - 1
    const newDate = addLeadingZeros(decrementedYear, month, day)
    setInputDate(newDate)
  }

  const incrementMonth = () => {
    const incrementedMonth = (month % 12) + 1
    const nextYear = incrementedMonth === 1 ? year + 1 : year
    const newDate = addLeadingZeros(nextYear, incrementedMonth, day)
    setInputDate(newDate)
  }

  const decrementMonth = () => {
    const decrementedMonth = month === 1 ? 12 : month - 1
    const prevYear = decrementedMonth === 12 ? year - 1 : year
    const newDate = addLeadingZeros(prevYear, decrementedMonth, day)
    setInputDate(newDate)
  }

  const setSelectedDateValue = (type: CellTypes, value: string) => () => {
    const newDate = updateDate(value, type)
    setSelectedDate(newDate)
    setInputDate(newDate)
  }

  const dates = useMemo(
    () => getCalendarData(year, month, startOfWeek),
    [year, month, startOfWeek],
  )

  return (
    <ErrorBoundary>
      <ThemeProvider theme={lightTheme}>
        <Wrapper>
          <Input onPressEnter={handleEnterPress} value={selectedDate} />
          <CurrentDateContainer>
            <YearButton onClick={decrementYear}>&lt;&lt;</YearButton>
            <MonthButton onClick={decrementMonth}>&lt; </MonthButton>
            <CurrentDate>{formatDate(inputDate)}</CurrentDate>
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
              const isHolidayCell = isHoliday(dateValue, holidays)
              return (
                <Cell
                  data-selected={isSelected}
                  data-isweekend={isWeekendCell}
                  data-isholiday={isHolidayCell}
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
