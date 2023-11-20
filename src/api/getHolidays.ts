import axios from "axios"

import { IHolidayData } from "@/types/interfaces"

export const getHolidays = async (year: number) => {
  let response
  const options = {
    method: "GET",
    url: `https://${process.env.HOLIDAY_API_URL}/${year}/BY`,
    headers: {
      "X-RapidAPI-Key": process.env.HOLIDAY_API_KEY,
      "X-RapidAPI-Host": process.env.HOLIDAY_API_URL,
    },
  }

  try {
    response = await axios.request(options)
  } catch (error) {
    console.error(error)
  }
  return response?.data as unknown as IHolidayData[]
}
