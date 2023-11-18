const getCurrentDate = (): string => {
  const date = new Date()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const day = date.getDate()
  return `${day < 10 ? "0" + day : day}.${month < 10 ? "0" + month : month}.${year}`
}

export const currentDate = getCurrentDate()
