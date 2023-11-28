import React from "react"

import { days } from "@/constants/days"
import { StartDays } from "@/constants/startDays"
import { ICalendarProps } from "@/types/interfaces"

import { Cell } from "./styled"

export const CalendarHeader = ({ startOfWeek }: Pick<ICalendarProps, "startOfWeek">) => (
  <>
    {days[startOfWeek].map((month) => (
      <Cell key={month}>{month}</Cell>
    ))}
  </>
)
