import { months } from "@/constants/months"

export const getDateParts = (value: string) => {
  const parts = value.split(".")
  const monthIndex = +parts[1]
  return {
    day: +parts[0],
    month: months[monthIndex - 1],
    year: +parts[2],
  }
}
