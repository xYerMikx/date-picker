import React, { ComponentType, Dispatch, SetStateAction } from "react"
import styled from "styled-components"

import { Controls } from "@/components/Controls/Controls"
import { Input } from "@/components/Input/Input"
import { CellTypes } from "@/constants/cellTypes"
import { ICalendarProps } from "@/types/interfaces"
import { getDateParts } from "@/utils/getDateParts"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { updateDate } from "@/utils/updateDate"

const Wrapper = styled.div`
  width: 350px;
`

export function withInputAndControlsLogic(
  Component: ComponentType<Omit<ICalendarProps, "dates" | "holidays">>,
  inputDate: string,
  setInputDate: Dispatch<SetStateAction<string>>,
  selectedDate: string,
  setSelectedDate: Dispatch<SetStateAction<string>>,
) {
  return (props: Omit<ICalendarProps, "dates" | "holidays" | "setSelectedDateValue">) => {
    const { day, month, year } = getDateParts(inputDate)

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

    return (
      <Wrapper>
        <Input onPressEnter={handleEnterPress} value={selectedDate} />
        <Controls
          month={month}
          year={year}
          inputDate={inputDate}
          setNewDate={setNewDate}
        />
        <Component {...props} setSelectedDateValue={setSelectedDateValue} />
      </Wrapper>
    )
  }
}
