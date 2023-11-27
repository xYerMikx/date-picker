import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react"
import { ComponentType } from "react"

import { TodoList } from "@/components/TodoList/TodoList"
import { StartDays } from "@/constants/startDays"
import { ICalendarProps, ITodo } from "@/types/interfaces"
import { getTodos } from "@/utils/getTodos"

export interface ITodoListProps extends ICalendarProps {
  includeHolidays: boolean
  includeWeekends: boolean
  startOfWeek: StartDays
  selectedDate: string
}

export function withTodoList(
  Component: ComponentType<
    Omit<ITodoListProps, "dates" | "holidays" | "setSelectedDateValue">
  >,
) {
  return (props: Omit<ITodoListProps, "dates" | "holidays" | "setSelectedDateValue">) => {
    const { includeHolidays, includeWeekends, startOfWeek, selectedDate } = props
    const [todos, setTodos] = useState<ITodo[]>(() => getTodos())
    const [todoText, setTodoText] = useState("")
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setTodoText(e.target.value)
    }

    const addTodo = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key !== "Enter") {
        return
      }
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Date.now(), description: todoText, todoDate: selectedDate },
      ])
      setTodoText("")
    }

    const removeTodo = (id: number) => () => {
      const filteredTodos = todos.filter((todo) => todo.id !== id)
      setTodos(filteredTodos)
    }

    useEffect(() => {
      localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    return (
      <div>
        <Component
          {...props}
          includeHolidays={includeHolidays}
          includeWeekends={includeWeekends}
          startOfWeek={startOfWeek}
          selectedDate={selectedDate}
        />
        <TodoList
          deleteTodo={removeTodo}
          todos={todos}
          todo={todoText}
          onChange={onChange}
          handleKeyDown={addTodo}
          selectedDate={selectedDate}
        />
      </div>
    )
  }
}
