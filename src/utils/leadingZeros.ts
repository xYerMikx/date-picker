export const addLeadingZeros = (year: number, month: number, date: number) => `${date < 10 ? `0${  date}` : date}.${month < 10 ? `0${  month}` : month}.${year}`
