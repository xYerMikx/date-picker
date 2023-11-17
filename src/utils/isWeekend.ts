export const isWeekend = (year: number, month: number, date: number) => {
  const dayIndex = new Date(year, month - 1, date).getDay()
  return dayIndex === 0 || dayIndex === 6
}
