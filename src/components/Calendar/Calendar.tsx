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
  setSelectedDateValue,
  includeWeekends,
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
        />
      </>
    ) : (
      renderDatesDropdown()
    )}
  </CalendarContainer>
)
