import { Dispatch, SetStateAction } from "react"

export const validateInputDate = (
  inputValue: string,
  setIsValid: Dispatch<SetStateAction<boolean>>,
  setIsEmpty: Dispatch<SetStateAction<boolean>>,
) => {
  const datePattern =
    /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[012])\.(19|20|21|22|23|24|25)\d{2}$/
  if (inputValue.length > 9 && !datePattern.test(inputValue)) {
    const [day, month, year] = inputValue.split(".").map(Number)
    const { length } = inputValue.split(".")
    const maxDay = new Date(year, month, 0).getDate()
    if (day >= maxDay || month > 12 || length > 2) {
      setIsValid(false)
    }
  } else {
    setIsValid(true)
    setIsEmpty(inputValue.length < 1)
  }
}

export const isValidRange = (fromDate: string, toDate: string) => {
  const [fromDay, fromMonth, fromYear] = fromDate.split(".").map(Number)
  const [toDay, toMonth, toYear] = toDate.split(".").map(Number)

  const from = new Date(fromYear, fromMonth - 1, fromDay)
  const to = new Date(toYear, toMonth - 1, toDay)

  return from < to
}
