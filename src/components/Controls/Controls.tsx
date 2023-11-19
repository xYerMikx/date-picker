import React, { Dispatch, SetStateAction } from "react"

import { formatDate } from "@/utils/formatDate"
import { addLeadingZeros } from "@/utils/leadingZeros"

import { CurrentDate, CurrentDateContainer, MonthButton, YearButton } from "./styled"

interface IControlsProps {
  day: number
  month: number
  year: number
  inputDate: string
  setInputDate: Dispatch<SetStateAction<string>>
  setSelectedDate: Dispatch<SetStateAction<string>>
}

export const Controls = ({
  day,
  month,
  year,
  inputDate,
  setInputDate,
  setSelectedDate,
}: IControlsProps) => {
  const incrementYear = () => {
    const incrementedYear = year + 1
    const newDate = addLeadingZeros(incrementedYear, month, day)
    setInputDate(newDate)
    setSelectedDate(newDate)
  }

  const decrementYear = () => {
    const decrementedYear = year - 1
    const newDate = addLeadingZeros(decrementedYear, month, day)
    setInputDate(newDate)
    setSelectedDate(newDate)
  }

  const incrementMonth = () => {
    const incrementedMonth = (month % 12) + 1
    const nextYear = incrementedMonth === 1 ? year + 1 : year
    const newDate = addLeadingZeros(nextYear, incrementedMonth, day)
    setInputDate(newDate)
    setSelectedDate(newDate)
  }

  const decrementMonth = () => {
    const decrementedMonth = month === 1 ? 12 : month - 1
    const prevYear = decrementedMonth === 12 ? year - 1 : year
    const newDate = addLeadingZeros(prevYear, decrementedMonth, day)
    setInputDate(newDate)
    setSelectedDate(newDate)
  }
  return (
    <CurrentDateContainer>
      <YearButton onClick={decrementYear}>&lt;&lt;</YearButton>
      <MonthButton onClick={decrementMonth}>&lt; </MonthButton>
      <CurrentDate>{formatDate(inputDate)}</CurrentDate>
      <MonthButton onClick={incrementMonth}>&gt; </MonthButton>
      <YearButton onClick={incrementYear}>&gt;&gt; </YearButton>
    </CurrentDateContainer>
  )
}
