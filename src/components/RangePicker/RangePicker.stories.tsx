import { StartDays } from "@/constants/startDays"
import { Themes } from "@/constants/theme"

import { RangePicker } from "./RangePicker"

export default {
  title: "RangePicker",
  component: RangePicker,
  tags: ["autodocs"],
}

export const DefaultDatePicker = {
  args: {
    startOfWeek: StartDays.Monday,
    includeWeekends: true,
    includeHolidays: true,
    theme: Themes.Light,
    fromValue: "21.11.2023",
    toValue: "25.11.2023",
  },
}
