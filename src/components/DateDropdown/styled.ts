import styled from "styled-components"

export const Wrapper = styled.div`
  z-index: 5;
  position: absolute;
  top: 50px;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.bgColor};
  width: 250px;
  display: none;
  &[data-isseen="true"] {
    display: block;
  }
  padding: ${(props) => props.theme.spacings.lg};
`

export const StyledP = styled.p``

export const Button = styled.button`
  background: none;
  border: none;
  width: 50px;
  height: 50px;
  border: 1px solid ${(props) => props.theme.blue};
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s linear;

  &[data-current="true"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }

  &:hover {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
`

export const YearButton = styled.button`
  background: none;
  border: none;
  border: 1px solid ${(props) => props.theme.blue};
  border-radius: ${(props) => props.theme.borderRadius};
  transition: all 0.2s linear;

  &:hover {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
`

export const Container = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacings.sm};
  flex-wrap: wrap;
`
