import styled from "styled-components"

export const CurrentDateContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: ${(props) => props.theme.spacings.md} 0;

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

export const CurrentDate = styled.p`
  cursor: pointer;
`
