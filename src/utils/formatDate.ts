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
