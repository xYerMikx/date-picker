import styled from "styled-components"

export const CalendarContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Wrapper = styled.div`
  width: 350px;
`

export const DaysContainer = styled.div``

export const Cell = styled.div`
  width: 50px;
  text-align: center;
  padding: 15px 0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s linear;

  &[data-isholiday="true"] {
    color: ${(props) => props.theme.green};
  }
  &[data-isweekend="true"] {
    color: ${(props) => props.theme.red};
  }
  &[data-selected="false"] {
    &:hover {
      background-color: ${(props) => props.theme.bgColor};
    }
  }

  &[data-selected="true"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
  &[data-prev="true"],
  &[data-next="true"] {
    color: ${(props) => props.theme.lightGray};
  }
`

export const CurrentDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;

  & > p {
    width: 200px;
    text-align: center;
  }
`

const Button = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  transition: all 0.2s linear;
  &:hover {
    opacity: 0.35;
  }
`

export const MonthButton = styled(Button)``
export const YearButton = styled(Button)``

export const CurrentDate = styled.p``
