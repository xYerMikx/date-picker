export const isHoliday = (date: string, holidays: string[]) => {
  return holidays.includes(date)
}
