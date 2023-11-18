import React, {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react"

import { validateInputDate } from "@/utils/validateInputDate"

import { Calendar } from "../Icons/Calendar"
import { Cross } from "../Icons/Cross"
import { Container, ErrorSpan, InputContainer, StyledInput } from "./styled"

interface IProps {
  value: string
  onPressEnter: (value: string) => void
}

export const Input = ({ value, onPressEnter }: IProps) => {
  const [isValid, setIsValid] = useState<boolean>(true)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState(value)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const inputRef = useRef<HTMLInputElement>(null)
  const inputValueRef = useRef<string>(value)
  const changeInputDate = (e: ChangeEvent<HTMLInputElement>) => {
    const valueFromInput = e.target.value
    setInputValue(valueFromInput)
    inputValueRef.current = valueFromInput
    validateInputDate(valueFromInput, setIsValid, setIsEmpty)
  }

  const clearInput = () => {
    setInputValue("")
    setIsEmpty(true)
    setIsValid(true)
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onPressEnter(inputValueRef.current)
    }
  }

  return (
    <Container>
      <InputContainer>
        <Calendar onClick={focusInput} />
        <StyledInput
          ref={inputRef}
          data-isvalid={isValid}
          value={inputValue}
          onChange={changeInputDate}
          onKeyDown={handleKeyDown}
          placeholder="dd.mm.yyyy"
        />
        {!isEmpty && <Cross onClick={clearInput} />}
      </InputContainer>
      {!isValid && <ErrorSpan>Write date in dd.mm.yyyy or write valid date</ErrorSpan>}
    </Container>
  )
}
