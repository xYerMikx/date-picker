import styled, { css } from "styled-components"

const selectedStyles = css`
  background-color: ${({ theme }) => theme.blue};
  color: ${({ theme }) => theme.white};
`

export const Cell = styled.div`
  user-select: none;
  width: 50px;
  text-align: center;
  padding: ${({ theme }) => theme.spacings.md} 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s linear;

  &[data-isholiday="true"] {
    color: ${({ theme }) => theme.green};
  }
  &[data-isweekend="true"] {
    color: ${({ theme }) => theme.red};
  }
  &[data-selected="false"]:hover {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
  }
  &[data-inrange="true"] {
    background-color: ${({ theme }) => theme.lightBlue};
    color: ${({ theme }) => theme.blue};
    border-radius: 0;
  }
  &[data-selected="true"] {
    ${selectedStyles}
  }
  &[data-prev="true"],
  &[data-next="true"] {
    color: ${({ theme }) => theme.lightGray};
  }
  &[data-from="true"] {
    border-radius: ${({ theme }) => theme.borderRadius} 0 0
      ${({ theme }) => theme.borderRadius};
  }
  &[data-from="true"],
  &[data-to="true"] {
    ${selectedStyles}
    &:hover {
      background-color: ${({ theme }) => theme.blue};
    }
  }
  &[data-to="true"] {
    border-radius: 0 ${({ theme }) => theme.borderRadius}
      ${({ theme }) => theme.borderRadius} 0;
  }
`
