import React, { ChangeEvent, KeyboardEvent, MouseEventHandler } from "react"

import { ITodo } from "@/types/interfaces"

import {
  CloseButton,
  StyledInput,
  Todo,
  TodoDate,
  TodoDesc,
  TodoWrapper,
  Wrapper,
} from "./styled"

interface ITodoListProps {
  todos: ITodo[]
  todo: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void
  selectedDate: string
  deleteTodo: (id: number) => MouseEventHandler<HTMLButtonElement> | undefined
}

export const TodoList = ({
  todos,
  todo,
  onChange,
  handleKeyDown,
  selectedDate,
  deleteTodo,
}: ITodoListProps) => {
  const filteredTodos = todos.filter((todo) => todo.todoDate === selectedDate)
  return (
    <Wrapper>
      <StyledInput
        data-testid="todo-input"
        type="text"
        value={todo}
        onChange={onChange}
        placeholder="Create a todo task..."
        onKeyDown={handleKeyDown}
      />
      <TodoWrapper>
        <TodoDate>Todos for {selectedDate}</TodoDate>
        {filteredTodos.length > 0 ? (
          filteredTodos.map(({ id, description }, index) => (
            <Todo data-testid={`todo-${index}`} key={id}>
              <TodoDesc>{description}</TodoDesc>
              <CloseButton data-testid={`todo-delete-${index}`} onClick={deleteTodo(id)}>
                x
              </CloseButton>
            </Todo>
          ))
        ) : (
          <>No todos for that date</>
        )}
      </TodoWrapper>
    </Wrapper>
  )
}
