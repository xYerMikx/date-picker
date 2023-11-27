export const isDateInRange = (currentDate: string, fromDate: string, toDate: string) => {
  const [currentDay, currentMonth, currentYear] = currentDate.split(".").map(Number)
  const [fromDay, fromMonth, fromYear] = fromDate.split(".").map(Number)
  const [toDay, toMonth, toYear] = toDate.split(".").map(Number)

  const current = new Date(currentYear, currentMonth - 1, currentDay)
  const from = new Date(fromYear, fromMonth - 1, fromDay)
  const to = new Date(toYear, toMonth - 1, toDay)

  return current > from && current < to
}
