import React, { MouseEvent, useState } from "react"

import { shortMonths } from "@/constants/months"
import { years } from "@/constants/years"

import { Button, Container, StyledP, Wrapper, YearButton } from "./styled"

export interface IDateDropdownProps {
  isChoosingMonth: boolean
  isChoosingYear: boolean
  handleClick: VoidFunction
  handleMonthClick: VoidFunction
  currentMonth: number
  currentYear: number
  setNewDate: (year: number, month: number) => void
}

export const DateDropwdown = ({
  isChoosingMonth,
  isChoosingYear,
  handleClick,
  handleMonthClick,
  currentMonth,
  currentYear,
  setNewDate,
}: IDateDropdownProps) => {
  const [month, setMonth] = useState(currentMonth)
  const [year, setYear] = useState(currentYear)

  const handleMonthClickChange = (e: MouseEvent<HTMLButtonElement>) => {
    const newMonth = shortMonths.indexOf(e.currentTarget.innerText) + 1
    setMonth(newMonth)
    setNewDate(year, newMonth)
    handleMonthClick()
  }
  const handleYearClickChange = () => (e: MouseEvent<HTMLButtonElement>) => {
    const newYear = +e.currentTarget.innerText
    handleClick()
    setYear(newYear)
  }
  return (
    <Wrapper data-isseen={isChoosingMonth || isChoosingYear}>
      {isChoosingMonth && (
        <>
          <YearButton onClick={handleClick}>{year}</YearButton>
          <StyledP>Choose month</StyledP>
          <Container>
            {shortMonths.map((shortMonth) => {
              const isCurrentMonth = shortMonth === shortMonths[month - 1]
              return (
                <Button
                  key={shortMonth}
                  data-current={isCurrentMonth}
                  onClick={handleMonthClickChange}
                >
                  {shortMonth}
                </Button>
              )
            })}
          </Container>
        </>
      )}
      {isChoosingYear && (
        <>
          <StyledP>Choosing year</StyledP>
          <Container>
            {years.map((el) => {
              const isCurrentYear = el === currentYear
              return (
                <Button
                  key={el}
                  data-current={isCurrentYear}
                  onClick={handleYearClickChange()}
                >
                  {el}
                </Button>
              )
            })}
          </Container>
        </>
      )}
    </Wrapper>
  )
}
