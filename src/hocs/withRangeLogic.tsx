import React, { ComponentType, Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"

import { Controls } from "@/components/Controls/Controls"
import { Input } from "@/components/Input/Input"
import { IDateProps } from "@/types/interfaces"
import { validateEnterPress } from "@/utils/validateInputDate"

const Wrapper = styled.div`
  width: 350px;
`
const Paragraph = styled.p``

const InputWrapper = styled.div``

export default function withRangeLogic<T>(
  Component: ComponentType<T>,
  fromDate: string,
  toDate: string,
  setFromDate: Dispatch<SetStateAction<string>>,
  setToDate: Dispatch<SetStateAction<string>>,
  currDate: IDateProps,
  setCurrDate: Dispatch<SetStateAction<IDateProps>>,
) {
  return (props: T) => {
    const [isSelecting, setIsSelecting] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

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
      setCurrDate({ month: +newMonth, year })
    }

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
        <Controls
          month={currDate.month}
          year={currDate.year}
          inputDate={`23.${currDate.month}.${currDate.year}`}
          setNewDate={setNewDate}
        />
        <Component
          {...props}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseEnter={handleMouseEnter}
          fromDate={fromDate}
          toDate={toDate}
        />
      </Wrapper>
    )
  }
}
