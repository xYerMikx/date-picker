import { StartDays } from "@/constants/startDays"

import { TodoPicker } from "./TodoPicker"

export default {
  title: "TodoPicker",
  component: TodoPicker,
  tags: ["autodocs"],
}

export const DefaultDatePicker = {
  args: {
    value: "23.11.2023",
    startOfWeek: StartDays.Monday,
    includeHolidays: true,
    includeWeekends: true,
  },
}
