import { months } from "@/constants/months"

export const formatDate = (date: string) => {
  const parts = date.split(".").map(Number)
  const monthIndex = parts[1] < 10 ? +String(parts[1]).replace("0", "") : parts[1]
  const month = months[monthIndex - 1]
  return `${parts[0]} ${month} ${parts[2]}`
}

export const formatDateFromHolidays = (date: string) => {
  const parts = date.split("-").map(Number)
  return `${parts[1]}.${parts[2]}.${parts[0]}`
}

export const formateDateToSecs = (date: string) => {
  const parts = date.split(".").map(Number)
  const newDate = new Date(parts[2], parts[1] - 1, parts[0])
  return Math.floor(newDate.getTime() / 1000)
}

export const returnFormatedDate = (
  inputValue: string,
  min: string,
  max: string,
): number[] => [inputValue, min, max].map((date) => formateDateToSecs(date))
