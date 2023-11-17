export const getCurrentDate = (): string | null => {
  const date = new Date()
  return String(date.getDate())
}
