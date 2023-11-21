import { StartDays } from "@/constants/startDays"

import { DatePicker } from "./DatePicker"
import { Themes } from "@/constants/theme"

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
