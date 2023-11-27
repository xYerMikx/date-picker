import styled from "styled-components"

export const Wrapper = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.bgColor};
  width: 250px;
  padding: ${({ theme }) => theme.spacings.lg};
`

export const StyledP = styled.p``

export const Button = styled.button`
  background: none;
  border: none;
  width: 50px;
  height: 50px;
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  transition: all 0.2s linear;

  &[data-current="true"] {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`

export const YearButton = styled.button`
  background: none;
  border: none;
  border: 1px solid ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.2s linear;

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.sm};
  flex-wrap: wrap;
`
