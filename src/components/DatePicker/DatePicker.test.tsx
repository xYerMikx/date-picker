import "@testing-library/jest-dom"

import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import axios from "axios"
import React from "react"
import { act } from "react-dom/test-utils"

import { months, shortMonths } from "@/constants/months"
import { StartDays } from "@/constants/startDays"
import { Themes } from "@/constants/theme"
import { currentDate as value } from "@/utils/getCurrentDate"
import { addLeadingZeros } from "@/utils/leadingZeros"

import { DatePicker } from "./DatePicker"

jest.mock("axios")

const mockAxios = axios as jest.Mocked<typeof axios>

const currentDate = new Date()

const mockProps = {
  startOfWeek: StartDays.Monday,
  includeHolidays: true,
  includeWeekends: true,
  value,
  theme: Themes.Dark,
}
describe("DatePicker tests", () => {
  let user: UserEvent
  beforeEach(async () => {
    user = userEvent.setup()
    mockAxios.get.mockResolvedValue({ data: [{ date: "2023-10-10" }] })
    await waitFor(() => render(<DatePicker {...mockProps} />))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  it("should have picker rendered", () => {
    expect(screen.getByTestId("input")).toBeInTheDocument()
  })

  it("should render correct current date", () => {
    const currentYear = String(currentDate.getFullYear())
    const currentMonth = months[currentDate.getMonth()]
    const currentDay = String(currentDate.getDate())
    expect(screen.getByTestId("current-date")).toHaveTextContent(currentYear)
    expect(screen.getByTestId("current-date")).toHaveTextContent(currentMonth)
    expect(screen.getByTestId("current-date")).toHaveTextContent(currentDay)
  })

  it("should contain correct current date in input", () => {
    const currentYear = currentDate.getFullYear()
    const currentMonth = currentDate.getMonth() + 1
    const currentDay = currentDate.getDate()
    expect(screen.getByTestId("input")).toHaveValue(
      `${currentDay}.${currentMonth}.${currentYear}`,
    )
  })

  it("should handle click on date", async () => {
    const dateToClick = {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: 10,
    }
    const cell = screen.getByText("10", { exact: true })
    await user.click(cell)
    const input = screen.getByTestId("input")
    expect(input).toHaveValue(
      addLeadingZeros(dateToClick.year, dateToClick.month, dateToClick.day),
    )
  })
  it("should handle user input", async () => {
    const input = screen.getByTestId("input")

    await user.clear(input)
    await user.type(input, "10.09.2023")
    expect(input).toHaveValue("10.09.2023")

    await user.keyboard("{enter}")
    const date = screen.getByText("10 September 2023")
    expect(date).toBeInTheDocument()
  })
  it("should handle month change", async () => {
    const monthToBeClicked = shortMonths[3]

    const date = screen.getByTestId("current-date")

    await user.click(date)

    const dateDropdown = screen.getByTestId("dropdown-date")
    expect(dateDropdown).toBeInTheDocument()

    const monthCell = await screen.findByTestId(monthToBeClicked)
    await user.click(monthCell)

    expect(dateDropdown).not.toBeInTheDocument()
  })
})
