import React, { ChangeEvent, useRef, useState } from "react"

import { validateInputDate } from "@/utils/validateInputDate"

import { Calendar } from "../Icons/Calendar"
import { Cross } from "../Icons/Cross"
import { Container, ErrorSpan, InputContainer, StyledInput } from "./styled"

interface IProps {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ value, onChange }: IProps) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const changeInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(e)
    validateInputDate(inputValue, setIsValid, setIsEmpty)
  }

  const clearInput = (e: MouseEvent) => {
    const event = {
      target: {
        value: "",
      },
    } as ChangeEvent<HTMLInputElement>
    onChange(event)
    setIsEmpty(true)
    setIsValid(true)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <Container>
      <InputContainer>
        <Calendar onClick={focusInput} />
        <StyledInput
          ref={inputRef}
          data-isvalid={isValid}
          value={value}
          onChange={changeInputDate}
          placeholder="dd.mm.yyyy"
        />
        {!isEmpty && <Cross onClick={clearInput} />}
      </InputContainer>
      {!isValid && <ErrorSpan>Write date in dd.mm.yyyy or write valid date</ErrorSpan>}
    </Container>
  )
}
