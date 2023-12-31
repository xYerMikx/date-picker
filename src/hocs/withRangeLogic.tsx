import React, { ComponentType, Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"

import { DateDropwdown } from "@/components/DateDropdown/DateDropdown"
import { Input } from "@/components/Input/Input"
import { CurrentDate, Wrapper } from "@/styles/common"
import { IDateProps } from "@/types/interfaces"
import { formatDate } from "@/utils/formatDate"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { validateEnterPress } from "@/utils/validateInputDate"

const Paragraph = styled.p`
  margin: ${({ theme }) => theme.spacings.md} 0;
`
const InputWrapper = styled.div``

export function withRangeLogic<T>(
  Component: ComponentType<T>,
  fromDate: string,
  toDate: string,
  setFromDate: Dispatch<SetStateAction<string>>,
  setToDate: Dispatch<SetStateAction<string>>,
  currDate: IDateProps,
  setCurrDate: Dispatch<SetStateAction<IDateProps>>,
  isRenderingCalendar: boolean,
  setIsRenderingCalendar: Dispatch<SetStateAction<boolean>>,
  inputDate: string,
  setInputDate: Dispatch<SetStateAction<string>>,
) {
  return (props: Omit<T, "renderDatesDropdown">) => {
    const [isSelecting, setIsSelecting] = useState(false)
    const [error, setError] = useState("")
    const [isChoosingYear, setIsChoosingYear] = useState(false)
    const day = inputDate.slice(0, 2)

    const handleDateClick = () => {
      setIsRenderingCalendar(!isRenderingCalendar)
    }

    const handleChoosingYearClick = () => {
      setIsChoosingYear(!isChoosingYear)
    }

    const handleToEnterPress = (toDate: string) => {
      validateEnterPress(setToDate, setError, fromDate, toDate)
    }
    const handleFromEnterPress = (fromDate: string) => {
      validateEnterPress(setToDate, setError, fromDate, toDate)
    }
    const handleMouseDown = (date: string) => () => {
      setFromDate(date)
      setToDate("")
      setIsSelecting(true)
    }
    const handleMouseUp = (date: string) => () => {
      if (fromDate === date) {
        setError("Choose range for at least two days")
        setTimeout(() => {
          setFromDate("")
          setToDate("")
          setError("")
          setIsSelecting(false)
        }, 1000)
        return
      }
      setToDate(date)
      setIsSelecting(false)
    }
    const handleMouseEnter = (date: string) => () => {
      if (isSelecting) {
        setToDate(date)
      }
    }

    const setNewDate = (year: number, month: number) => {
      const newMonth = month < 10 ? `0${month}` : month
      const newDate = addLeadingZeros(year, +newMonth, +day)
      setCurrDate({ month: +newMonth, year })
      setInputDate(newDate)
    }

    const renderDatesDropdown = (): JSX.Element => (
      <DateDropwdown
        setNewDate={setNewDate}
        currentYear={currDate.year}
        currentMonth={currDate.month}
        handleClick={handleChoosingYearClick}
        handleMonthClick={handleDateClick}
        isChoosingYear={isChoosingYear}
      />
    )

    return (
      <Wrapper>
        <InputWrapper>
          <Paragraph>From date:</Paragraph>
          <Input
            testId="from-input"
            value={fromDate}
            onPressEnter={handleFromEnterPress}
          />
        </InputWrapper>
        <InputWrapper>
          <Paragraph>To date:</Paragraph>
          <Input testId="to-input" value={toDate} onPressEnter={handleToEnterPress} />
        </InputWrapper>
        {error && <Paragraph>{error}</Paragraph>}
        <CurrentDate onClick={handleDateClick}>{formatDate(inputDate)}</CurrentDate>
        <Component
          {...(props as T)}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseEnter={handleMouseEnter}
          fromDate={fromDate}
          toDate={toDate}
          isRenderingCalendar={isRenderingCalendar}
          renderDatesDropdown={renderDatesDropdown}
        />
      </Wrapper>
    )
  }
}
