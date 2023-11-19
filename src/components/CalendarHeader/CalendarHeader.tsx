import React from "react"

import { days } from "@/constants/days"
import { StartDays } from "@/constants/startDays"

import { Cell } from "./styled"

interface ICalendarHeaderProps {
  startOfWeek: StartDays
}
export const CalendarHeader = ({ startOfWeek }: ICalendarHeaderProps) => (
    <>
      {days[startOfWeek].map((month) => (
        <Cell key={month}>{month}</Cell>
      ))}
    </>
  )
