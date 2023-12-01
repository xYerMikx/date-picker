import React, { ComponentType, Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"

import { DateDropwdown } from "@/components/DateDropdown/DateDropdown"
import { Input } from "@/components/Input/Input"
import { CellTypes } from "@/constants/cellTypes"
import { CurrentDate, Wrapper } from "@/styles/common"
import { ICalendarProps } from "@/types/interfaces"
import { formatDate } from "@/utils/formatDate"
import { getDateParts } from "@/utils/getDateParts"
import { isDateWithinMinMaxRange } from "@/utils/isDateInRange"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { updateDate } from "@/utils/updateDate"

const ErrorMsg = styled.p`
  margin-top: ${({ theme }) => theme.spacings.xs};
  font-size: ${({ theme }) => theme.fontSize.xs};
  color: ${({ theme }) => theme.red};
`

export function withInputAndControlsLogic(
  Component: ComponentType<Omit<ICalendarProps, "dates" | "holidays">>,
  inputDate: string,
  setInputDate: Dispatch<SetStateAction<string>>,
  selectedDate: string,
  setSelectedDate: Dispatch<SetStateAction<string>>,
  isRenderingCalendar: boolean,
  setIsRenderingCalendar: Dispatch<SetStateAction<boolean>>,
  max: string | undefined,
  min: string | undefined,
) {
  return (
    props: Omit<
      ICalendarProps,
      "dates" | "holidays" | "setSelectedDateValue" | "renderDatesDropdown"
    >,
  ) => {
    const { day, month, year } = getDateParts(inputDate)
    const [isChoosingYear, setIsChoosingYear] = useState(false)
    const [isDateValid, setIsDateValid] = useState(true)

    const handleDateClick = () => {
      setIsRenderingCalendar(!isRenderingCalendar)
    }

    const handleChoosingYearClick = () => {
      setIsChoosingYear(!isChoosingYear)
    }

    const handleEnterPress = (inputValue: string) => {
      if (!isDateWithinMinMaxRange(inputValue, min, max)) {
        setIsDateValid(false)
        return
      }
      setIsDateValid(true)
      setSelectedDate(inputValue)
      setInputDate(inputValue)
    }

    const setSelectedDateValue = (type: CellTypes, value: string) => () => {
      const newDate = updateDate(value, type)
      if (!isDateWithinMinMaxRange(newDate, min, max)) {
        setIsDateValid(false)
        return
      }
      setIsDateValid(true)
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
        {!isDateValid && (
          <ErrorMsg>
            Your date is either more than {max} or less than {min}
          </ErrorMsg>
        )}
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
