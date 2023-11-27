import "@testing-library/jest-dom"

import { fireEvent, render, screen,waitFor } from "@testing-library/react"
import userEvent, { UserEvent } from "@testing-library/user-event"
import axios from "axios"
import React from "react"
import { act } from "react-dom/test-utils"

import { StartDays } from "@/constants/startDays"

import { TodoPicker } from "./TodoPicker"

jest.mock("axios")
const mockAxios = axios as jest.Mocked<typeof axios>

describe("TodoPicker", () => {
  let user: UserEvent
  beforeEach(async () => {
    user = userEvent.setup()
    mockAxios.get.mockResolvedValue({ data: [{ date: "2023-10-10" }] })
    await waitFor(() =>
      render(
        <TodoPicker
          value="24.11.2023"
          startOfWeek={StartDays.Monday}
          includeHolidays
          includeWeekends
        />,
      ),
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
    localStorage.clear()
  })
  it("renders without crashing", () => {
    const input = screen.getByTestId("input")
    expect(input).toHaveValue("24.11.2023")
  })

  it("adds a todo on enter", async () => {
    const input = screen.getByTestId("todo-input")
    await act(() => {
      fireEvent.change(input, { target: { value: "Test todo" } })
      fireEvent.keyDown(input, { key: "Enter", code: "Enter" })
    })
    await waitFor(() => expect(screen.getByText("Test todo")).toBeInTheDocument())
  })

  it("removes a todo on click", async () => {
    const input = screen.getByTestId("todo-input")
    await user.clear(input)
    await user.type(input, "my todo")
    await user.keyboard("{enter}")

    const todo = await waitFor(() => screen.getByText("my todo"))

    const todoDeleteBtn = await waitFor(() => screen.getByTestId("todo-delete-0"))
    await user.click(todoDeleteBtn)
    await waitFor(() => expect(todo).not.toBeInTheDocument())
  })
})
