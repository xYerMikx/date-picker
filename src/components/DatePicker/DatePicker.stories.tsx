import { StartDays } from "@/constants/startDays"

import { DatePicker } from "./DatePicker"

export default {
  title: "DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
}

export const DefaultDatePicker = {
  args: {
    startOfWeek: StartDays.Sunday,
    value: "18.11.2023",
  },
}
