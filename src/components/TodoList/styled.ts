import styled from "styled-components"

export const StyledInput = styled.input`
  border: none;
  padding: ${({ theme }) => theme.spacings.xs};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.gray};

  &:focus {
    outline: 1px solid ${({ theme }) => theme.black};
  }
`

export const Wrapper = styled.div``
export const TodoWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.sm};
  max-height: 300px;
  overflow: auto;
`
export const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.black};
  width: 300px;
  padding: ${({ theme }) => theme.spacings.xs};
  border-radius: ${({ theme }) => theme.borderRadius};
`
export const TodoDesc = styled.p``
export const CloseButton = styled.button`
  font-size: ${({ theme }) => theme.fontSize.lg};
  cursor: pointer;
  background: none;
  border: none;
  transition: all 0.1s linear;
  &:hover {
    color: ${({ theme }) => theme.red};
  }
`
export const TodoDate = styled.p``
