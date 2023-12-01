import styled from "styled-components"

export const StyledInput = styled.input`
  border: none;
  padding: ${({ theme }) => theme.spacings.xs};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.gray};
  margin-bottom: ${({ theme }) => theme.spacings.md};

  &:focus {
    outline: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.black};
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
  border: ${({ theme }) => theme.borderSize} solid ${({ theme }) => theme.black};
  width: 300px;
  padding: ${({ theme }) => theme.spacings.xs};
  border-radius: ${({ theme }) => theme.borderRadius};
`
export const TodoDesc = styled.p`
  padding: ${({ theme }) => theme.spacings.xs} ${({ theme }) => theme.spacings.md};
`
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
export const TodoDate = styled.p`
  margin-bottom: ${({ theme }) => theme.spacings.xs};
`
