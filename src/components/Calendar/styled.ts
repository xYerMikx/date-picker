import styled from "styled-components"

export const Cell = styled.div`
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
    }
  }

  &[data-selected="true"] {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
  &[data-prev="true"],
  &[data-next="true"] {
    color: ${({ theme }) => theme.lightGray};
  }
`

export const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
