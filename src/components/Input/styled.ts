import styled from "styled-components"

export const ErrorSpan = styled.span`
  color: ${({ theme }) => theme.red};
  font-size: ${({ theme }) => theme.fontSize.sm};
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`

export const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  & > svg {
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }
  & > svg:first-child {
    left: 5px;
  }
  & > svg:last-child {
    left: 170px;
  }
`

export const StyledInput = styled.input`
  padding: ${({ theme }) => theme.spacings.sm} ${({ theme }) => theme.spacings.xl};
  color: ${({ theme }) => theme.black};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.lightGray};
  &:focus {
    outline: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.dark};
  }

  &[data-isvalid="false"] {
    outline: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.red};
  }
`
