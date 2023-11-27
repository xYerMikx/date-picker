import React, { Dispatch, SetStateAction, useState } from "react"

import { formatDate } from "@/utils/formatDate"

import { DateDropwdown } from "../DateDropdown/DateDropwdown"
import { CurrentDate, CurrentDateContainer } from "./styled"

interface IControlsProps {
  month: number
  year: number
  inputDate: string
  setNewDate: (year: number, month: number) => void
}

export const Controls = ({ inputDate, month, year, setNewDate }: IControlsProps) => {
  const [isChoosingMonth, setIsChoosingMonth] = useState(false)
  const [isChoosingYear, setIsChoosingYear] = useState(false)

  const handleDateClick = () => {
    setIsChoosingMonth(!isChoosingMonth)
  }

  const handleChoosingYearClick = () => {
    if (isChoosingMonth) {
      setIsChoosingMonth(false)
      setIsChoosingYear(true)
    }
    if (isChoosingYear) {
      setIsChoosingMonth(true)
      setIsChoosingYear(false)
    }
  }
  return (
    <CurrentDateContainer>
      <CurrentDate onClick={handleDateClick}>{formatDate(inputDate)}</CurrentDate>
      <DateDropwdown
        setNewDate={setNewDate}
        currentYear={year}
        currentMonth={month}
        handleClick={handleChoosingYearClick}
        handleMonthClick={handleDateClick}
        isChoosingYear={isChoosingYear}
      />
    </CurrentDateContainer>
  )
}
