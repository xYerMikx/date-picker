import React, { ComponentType, Dispatch, SetStateAction, useState } from "react"
import styled from "styled-components"

import { Input } from "@/components/Input/Input"
import { ICalendarProps } from "@/types/interfaces"
import { isValidRange } from "@/utils/validateInputDate"

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
) {
  return (props: T) => {
    const [isSelecting, setIsSelecting] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const handleToEnterPress = (value: string) => {
      if (isValidRange(fromDate, value)) {
        setToDate(value)
      } else {
        setError("From date should be less than to date")
      }
    }
    const handleFromEnterPress = (value: string) => {
      if (isValidRange(value, toDate)) {
        setFromDate(value)
      } else {
        setError("From date should be less than to date")
      }
    }
    const handleMouseDown = (date: string) => () => {
      setFromDate(date)
      setToDate("")
      setIsSelecting(true)
    }
    const handleMouseUp = (date: string) => () => {
      setToDate(date)
      setIsSelecting(false)
    }
    const handleMouseEnter = (date: string) => () => {
      if (isSelecting) {
        setToDate(date)
      }
    }
    return (
      <Wrapper>
        <InputWrapper>
          <Paragraph>From date:</Paragraph>
          <Input value={fromDate} onPressEnter={handleFromEnterPress} />
        </InputWrapper>
        <InputWrapper>
          <Paragraph>To date:</Paragraph>
          <Input value={toDate} onPressEnter={handleToEnterPress} />
        </InputWrapper>
        {error && <Paragraph>{error}</Paragraph>}
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
