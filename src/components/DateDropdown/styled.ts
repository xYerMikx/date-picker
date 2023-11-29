import styled from "styled-components"

export const Wrapper = styled.div`
  background-color: white;
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.bgColor};
  width: 350px;
  padding: ${({ theme }) => theme.spacings.lg};
`

export const StyledP = styled.p`
  margin-bottom: ${({ theme }) => theme.spacings.xl};
`

export const Button = styled.button`
  background: none;
  border: none;
  width: 65px;
  height: 65px;
  border: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.blue};
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
  border: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.blue};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: all 0.2s linear;
  padding: ${({ theme }) => theme.spacings.xs} ${({ theme }) => theme.spacings.md};
  margin-bottom: ${({ theme }) => theme.spacings.md};

  &:hover {
    background-color: ${({ theme }) => theme.blue};
    color: ${({ theme }) => theme.white};
  }
`

export const Container = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacings.sm};
  flex-wrap: wrap;
  justify-content: space-evenly;
`
