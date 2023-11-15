import React from "react"
import { FC } from "react"

type Props = {
  text: string
  color: string
}

export const Button: FC<Props> = ({ text, color }) => (
  <button type="submit" style={{ backgroundColor: color }}>
    {text}
  </button>
)
