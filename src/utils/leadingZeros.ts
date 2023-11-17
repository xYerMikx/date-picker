export const addLeadingZeros = (year: number, month: number, date: number) => {
  return `${date < 10 ? "0" + date : date}.${month < 10 ? `0` + month : month}.${year}`
}
