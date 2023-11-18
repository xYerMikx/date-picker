import { CellTypes } from "@/constants/cellTypes"

export interface DateCell {
  year: number
  month: number
  date: number
  type: CellTypes
}
export interface IHolidayData {
  counties: null
  countryCode: string
  date: string
  fixed: boolean
  global: boolean
  launchYear: null
  localName: string
  name: string
  type: string
}
