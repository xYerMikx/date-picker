import React, { ComponentType, Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"

import { DateDropwdown } from "@/components/DateDropdown/DateDropdown"
import { Input } from "@/components/Input/Input"
import { CellTypes } from "@/constants/cellTypes"
import { ICalendarProps } from "@/types/interfaces"
import { formatDate } from "@/utils/formatDate"
import { getDateParts } from "@/utils/getDateParts"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { updateDate } from "@/utils/updateDate"

const Wrapper = styled.div`
  width: 350px;
`
const CurrentDate = styled.p`
  cursor: pointer;
`

export function withInputAndControlsLogic(
  Component: ComponentType<Omit<ICalendarProps, "dates" | "holidays">>,
  inputDate: string,
  setInputDate: Dispatch<SetStateAction<string>>,
  selectedDate: string,
  setSelectedDate: Dispatch<SetStateAction<string>>,
  isRenderingCalendar: boolean,
  setIsRenderingCalendar: Dispatch<SetStateAction<boolean>>,
) {
  return (
    props: Omit<
      ICalendarProps,
      "dates" | "holidays" | "setSelectedDateValue" | "renderDatesDropdown"
    >,
  ) => {
    const { day, month, year } = getDateParts(inputDate)
    const [isChoosingYear, setIsChoosingYear] = useState(false)

    const handleDateClick = () => {
      setIsRenderingCalendar(!isRenderingCalendar)
    }

    const handleChoosingYearClick = () => {
      setIsChoosingYear(!isChoosingYear)
    }

    const handleEnterPress = (inputValue: string) => {
      setSelectedDate(inputValue)
      setInputDate(inputValue)
    }

    const setSelectedDateValue = (type: CellTypes, value: string) => () => {
      const newDate = updateDate(value, type)
      setSelectedDate(newDate)
      setInputDate(newDate)
    }

    const setNewDate = (year: number, month: number) => {
      const newDate = addLeadingZeros(year, month, day)
      setSelectedDate(newDate)
      setInputDate(newDate)
    }

    const renderDatesDropdown = (): JSX.Element => (
      <DateDropwdown
        setNewDate={setNewDate}
        currentYear={year}
        currentMonth={month}
        handleClick={handleChoosingYearClick}
        handleMonthClick={handleDateClick}
        isChoosingYear={isChoosingYear}
      />
    )

    return (
      <Wrapper>
        <Input onPressEnter={handleEnterPress} value={selectedDate} />
        <CurrentDate data-testid="current-date" onClick={handleDateClick}>
          {formatDate(inputDate)}
        </CurrentDate>
        <Component
          {...props}
          setSelectedDateValue={setSelectedDateValue}
          isRenderingCalendar={isRenderingCalendar}
          renderDatesDropdown={renderDatesDropdown}
        />
      </Wrapper>
    )
  }
}
