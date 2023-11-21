import styled from "styled-components"

export const ErrorSpan = styled.span`
  color: ${(props) => props.theme.red};
  font-size: ${(props) => props.theme.fontSize.sm};
`

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  & > svg {
    position: absolute;
    z-index: 1;
    cursor: pointer;
  }
  & > svg:first-child {
    left: 15px;
  }
  & > svg:last-child {
    left: 180px;
  }
`

export const StyledInput = styled.input`
  position: relative;
  padding: ${(props) => props.theme.spacings.sm} ${(props) => props.theme.spacings.xl};
  color: ${(props) => props.theme.black};
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.lightGray};
  &:focus {
    outline: 1px solid ${(props) => props.theme.dark};
  }

  &[data-isvalid="false"] {
    outline: 1px solid ${(props) => props.theme.red};
  }
`
