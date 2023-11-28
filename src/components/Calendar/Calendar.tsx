import React from "react"

import { ICalendarProps } from "@/types/interfaces"

import CalendarBody from "../CalendarBody/CalendarBody"
import { CalendarHeader } from "../CalendarHeader/CalendarHeader"
import { CalendarContainer } from "./styled"

export const Calendar = ({
  startOfWeek,
  dates,
  selectedDate,
  holidays,
  fromDate,
  toDate,
  setSelectedDateValue,
  includeWeekends,
  handleMouseUp,
  handleMouseDown,
  handleMouseEnter,
  isRenderingCalendar,
  renderDatesDropdown,
}: ICalendarProps) => (
  <CalendarContainer>
    {isRenderingCalendar ? (
      <>
        <CalendarHeader startOfWeek={startOfWeek} />
        <CalendarBody
          startOfWeek={startOfWeek}
          dates={dates}
          holidays={holidays}
          includeWeekends={includeWeekends}
          selectedDate={selectedDate}
          setSelectedDateValue={setSelectedDateValue}
          fromDate={fromDate}
          toDate={toDate}
          handleMouseDown={handleMouseDown}
          handleMouseUp={handleMouseUp}
          handleMouseEnter={handleMouseEnter}
        />
      </>
    ) : (
      renderDatesDropdown && renderDatesDropdown()
    )}
  </CalendarContainer>
)
