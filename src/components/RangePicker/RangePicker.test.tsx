import "@testing-library/jest-dom"

import { fireEvent,render, screen, waitFor } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import axios from "axios"
import React from "react"
import { act } from "react-dom/test-utils"

import { StartDays } from "@/constants/startDays"
import { Themes } from "@/constants/theme"

import { RangePicker } from "./RangePicker"

const mockProps = {
  startOfWeek: StartDays.Monday,
  fromValue: "21.11.2023",
  toValue: "25.11.2023",
  includeHolidays: false,
  includeWeekends: false,
  theme: Themes.Dark,
}

jest.mock("axios")
const mockAxios = axios as jest.Mocked<typeof axios>

describe("RangePicker", () => {
  let user: UserEvent
  beforeEach(async () => {
    user = userEvent.setup()
    mockAxios.get.mockResolvedValue({ data: [{ date: "2023-10-10" }] })
    await waitFor(() => render(<RangePicker {...mockProps} />))
  })

  afterEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })

  it("renders without crashing", () => {
    expect(screen.getByText("From date:")).toBeInTheDocument()
    expect(screen.getByText("To date:")).toBeInTheDocument()
  })

  it("handles correctly date range by default", () => {
    const fromInput = screen.getByDisplayValue(mockProps.fromValue)
    const toInput = screen.getByDisplayValue(mockProps.toValue)
    expect(fromInput).toBeInTheDocument()
    expect(toInput).toBeInTheDocument()
  })
  it("handles mouse events correctly", async () => {
    jest.useFakeTimers()
    const cellToClick = screen.getByText("10", { exact: true })
    const cellToDrag = screen.getByText("15", { exact: true })
    await act(async () => {
      fireEvent.mouseDown(cellToClick)
      fireEvent.mouseUp(cellToDrag)
    })
    await act(() => {})
    const fromInput: HTMLInputElement = screen.getByTestId("from-input")
    const toInput: HTMLInputElement = screen.getByTestId("to-input")
    expect(fromInput.value).toBe("10.11.2023")
    expect(toInput.value).toBe("15.11.2023")
  })
})
