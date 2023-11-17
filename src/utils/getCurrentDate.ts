const getCurrentDate = (): string | null => {
  const date = new Date()
  return String(date.getDate())
}

export const currentDate = getCurrentDate()
