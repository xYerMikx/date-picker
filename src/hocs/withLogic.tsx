import React, { ComponentType, useEffect, useState } from "react"

import { getHolidays } from "@/api/getHolidays"
import { DateCell, ICalendarProps } from "@/types/interfaces"
import { formatDateFromHolidays } from "@/utils/formatDate"
import { getDateParts } from "@/utils/getDateParts"
import { addLeadingZeros } from "@/utils/leadingZeros"

export function withLogic(
  Component: ComponentType<ICalendarProps>,
  dates: DateCell[],
  day: number,
  month: number,
  year: number,
) {
  return (props: Omit<ICalendarProps, "holidays" | "dates">) => {
    const [holidays, setHolidays] = useState<string[]>([])
    const { includeHolidays } = props
    useEffect(() => {
      if (includeHolidays) {
        const fetchData = async () => {
          if (year) {
            const data = await getHolidays(year)
            const datesArray = data.map(({ date }) => {
              const { day, month, year } = getDateParts(formatDateFromHolidays(date))
              return addLeadingZeros(year, day, month)
            })
            setHolidays(datesArray)
          }
        }
        fetchData()
      }
    }, [year])

    return (
      <Component
        {...props}
        holidays={holidays}
        dates={dates}
        day={day}
        month={month}
        year={year}
      />
    )
  }
}
