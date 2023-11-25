import styled from "styled-components"

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
  &[data-selected="false"] {
    &:hover {
      background-color: ${({ theme }) => theme.bgColor};
      color: ${({ theme }) => theme.textColor};
    }
  }
  &[data-inrange="true"] {
    background-color: ${(props) => props.theme.lightBlue};
    color: ${(props) => props.theme.blue};
    border-radius: 0;
  }

  &[data-selected="true"] {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
  &[data-prev="true"],
  &[data-next="true"] {
    color: ${({ theme }) => theme.lightGray};
  }
  &[data-from="true"] {
    border-radius: ${(props) => props.theme.borderRadius} 0 0
      ${(props) => props.theme.borderRadius};
  }
  &[data-from="true"],
  &[data-to="true"] {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
    &:hover {
      background-color: ${({ theme }) => theme.blue};
    }
  }

  &[data-to="true"] {
    border-radius: 0 ${(props) => props.theme.borderRadius}
      ${(props) => props.theme.borderRadius} 0;
  }
`
