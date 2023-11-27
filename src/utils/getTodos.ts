import { ITodo } from "@/types/interfaces"

export const getTodos = () => {
  const value = localStorage.getItem("todos")
  if (typeof value === "string") {
    const todoList = JSON.parse(value) as ITodo[]
    return todoList
  } 
    return []
  
}
