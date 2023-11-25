import React from "react"

import { CellTypes } from "@/constants/cellTypes"
import { ICalendarProps } from "@/types/interfaces"
import { isDateInRange } from "@/utils/isDateInRange"
import { isHoliday } from "@/utils/isHoliday"
import { isWeekend } from "@/utils/isWeekend"
import { addLeadingZeros } from "@/utils/leadingZeros"

import { Cell } from "./styled"

const CalendarBody = ({
  dates,
  selectedDate,
  holidays,
  includeWeekends,
  fromDate,
  toDate,
  setSelectedDateValue,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}: Omit<ICalendarProps, "inclideHolidays" | "year">) => (
  <>
    {dates.map(({ date, year, month, type }) => {
      const dateValue = addLeadingZeros(year, month, date)
      const isSelected = selectedDate === dateValue && type === CellTypes.Current
      const isInRange = fromDate && toDate && isDateInRange(dateValue, fromDate, toDate)
      const dateFrom = fromDate === dateValue
      const dateTo = toDate === dateValue
      const isNext = type === CellTypes.Next
      const isPrev = type === CellTypes.Prev
      const isWeekendCell = includeWeekends && isWeekend(year, month, date)
      const isHolidayCell = isHoliday(dateValue, holidays)
      return (
        <Cell
          data-selected={isSelected}
          data-isweekend={isWeekendCell}
          data-isholiday={isHolidayCell}
          data-inrange={isInRange}
          data-to={dateTo}
          data-from={dateFrom}
          data-prev={isPrev}
          data-next={isNext}
          onClick={setSelectedDateValue && setSelectedDateValue(type, dateValue)}
          onMouseDown={handleMouseDown && handleMouseDown(dateValue)}
          onMouseUp={handleMouseUp && handleMouseUp(dateValue)}
          onMouseEnter={handleMouseEnter && handleMouseEnter(dateValue)}
          key={`${date}-${month}-${year}`}
        >
          {date}
        </Cell>
      )
    })}
  </>
)

export default CalendarBody
