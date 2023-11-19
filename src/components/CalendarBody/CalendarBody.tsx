import React from "react"

import { CellTypes } from "@/constants/cellTypes"
import { isHoliday } from "@/utils/isHoliday"
import { isWeekend } from "@/utils/isWeekend"
import { addLeadingZeros } from "@/utils/leadingZeros"

import { Cell } from "./styled"
import { ICalendarProps } from "@/types/interfaces"

const CalendarBody = ({
  dates,
  selectedDate,
  holidays,
  includeWeekends,
  setSelectedDateValue,
}: Omit<ICalendarProps, "inclideHolidays" | "year">) => (
  <>
    {dates.map(({ date, year, month, type }) => {
      const dateValue = addLeadingZeros(year, month, date)
      const isSelected = selectedDate === dateValue && type === CellTypes.Current
      const isNext = type === CellTypes.Next
      const isPrev = type === CellTypes.Prev
      const isWeekendCell = includeWeekends && isWeekend(year, month, date)
      const isHolidayCell = isHoliday(dateValue, holidays)
      return (
        <Cell
          data-selected={isSelected}
          data-isweekend={isWeekendCell}
          data-isholiday={isHolidayCell}
          data-prev={isPrev}
          data-next={isNext}
          onClick={setSelectedDateValue(type, dateValue)}
          key={`${date}-${month}-${year}`}
        >
          {date}
        </Cell>
      )
    })}
  </>
)

export default CalendarBody
