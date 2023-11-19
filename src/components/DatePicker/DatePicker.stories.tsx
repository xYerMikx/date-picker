import { StartDays } from "@/constants/startDays"

import { DatePicker } from "./DatePicker"

export default {
  title: "DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
}

export const DefaultDatePicker = {
  args: {
    startOfWeek: StartDays.Monday,
    includeWeekends: true,
    includeHolidays: true,
  },
}
