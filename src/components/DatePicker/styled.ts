import styled from "styled-components"

export const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 390px;
`

export const DaysContainer = styled.div``

export const Cell = styled.div`
  width: 50px;
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s linear;

  &[data-selected="false"] {
    &:hover {
      background-color: ${(props) => props.theme.bgColor};
    }
  }

  &[data-selected="true"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
  &[data-isweekend="true"] {
    color: ${(props) => props.theme.red};
  }
  &[data-prev="true"],
  &[data-next="true"] {
    color: ${(props) => props.theme.lightGray};
  }
`

export const CurrentDate = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`
