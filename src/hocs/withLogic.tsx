import React, { ComponentType, useEffect, useMemo, useState } from "react"

import { getHolidays } from "@/api/getHolidays"
import { DateCell, ICalendarProps, IHolidayData } from "@/types/interfaces"
import { formatDateFromHolidays } from "@/utils/formatDate"
import { getDateParts } from "@/utils/getDateParts"
import { addLeadingZeros } from "@/utils/leadingZeros"
import { getCalendarData } from "@/utils/getMonthDays"

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
            const data = (await getHolidays(year)) as unknown as IHolidayData[]
            const datesArray = data.map(({ date }) => {
              const { day, month, year } = getDateParts(formatDateFromHolidays(date))
              return addLeadingZeros(year!, month!, day!)
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
