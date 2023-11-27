export const getDateParts = (value: string) => {
  const parts = value.split(".").map(Number) as number[]
  return {
    day: parts[0],
    month: parts[1],
    year: parts[2],
  }
}
