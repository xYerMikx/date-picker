import { StartDays } from "@/constants/startDays"
import { Themes } from "@/constants/theme"

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
    theme: Themes.Dark,
  },
}
