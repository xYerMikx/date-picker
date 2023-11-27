import { ReactNode } from "react"

export interface IEBProps {
  children?: ReactNode
}

export interface IEBState {
  hasError: boolean
  error: Error | undefined
}
