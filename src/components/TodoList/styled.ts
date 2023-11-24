import styled from "styled-components"

export const StyledInput = styled.input`
  border: none;
  padding: ${(props) => props.theme.spacings.xs};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.gray};

  &:focus {
    outline: 1px solid ${(props) => props.theme.black};
  }
`

export const Wrapper = styled.div``
export const TodoWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacings.sm};
  max-height: 300px;
  overflow: auto;
`
export const Todo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.theme.black};
  width: 300px;
  padding: ${(props) => props.theme.spacings.xs};
  border-radius: ${(props) => props.theme.borderRadius};
`
export const TodoDesc = styled.p``
export const CloseButton = styled.button`
  font-size: ${(props) => props.theme.fontSize.lg};
  cursor: pointer;
  background: none;
  border: none;
  transition: all 0.1s linear;
  &:hover {
    color: ${(props) => props.theme.red};
  }
`
export const TodoDate = styled.p``
