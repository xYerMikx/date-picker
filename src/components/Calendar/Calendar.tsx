import React from "react"

import CalendarBody from "../CalendarBody/CalendarBody"
import { CalendarHeader } from "../CalendarHeader/CalendarHeader"
import { CalendarContainer } from "./styled"
import { ICalendarProps } from "@/types/interfaces"

export const Calendar = ({
  startOfWeek,
  dates,
  selectedDate,
  holidays,
  setSelectedDateValue,
  includeWeekends,
}: ICalendarProps) => (
  <CalendarContainer>
    <CalendarHeader startOfWeek={startOfWeek} />
    <CalendarBody
      startOfWeek={startOfWeek}
      dates={dates}
      holidays={holidays}
      includeWeekends={includeWeekends}
      selectedDate={selectedDate}
      setSelectedDateValue={setSelectedDateValue}
    />
  </CalendarContainer>
)
