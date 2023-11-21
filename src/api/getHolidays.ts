import axios from "axios"

import { IHolidayData } from "@/types/interfaces"

export const getHolidays = async (year: number) => {
  let response
  const url = `https://${process.env.HOLIDAY_API_URL}/${year}/BY`
  const options = {
    headers: {
      "X-RapidAPI-Key": process.env.HOLIDAY_API_KEY,
      "X-RapidAPI-Host": process.env.HOLIDAY_API_URL,
    },
  }

  try {
    response = await axios.get(url, options)
  } catch (error) {
    console.error(error)
  }
  return response?.data as unknown as IHolidayData[]
}
