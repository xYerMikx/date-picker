import { StartDays } from "./startDays"

const daysFromMonday = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
const daysFromSunday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
export const days = {
  [StartDays.Monday]: daysFromMonday,
  [StartDays.Sunday]: daysFromSunday,
}
