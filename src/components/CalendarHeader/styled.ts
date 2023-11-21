import styled from "styled-components"

export const Cell = styled.div`
  width: 50px;
  text-align: center;
  padding: ${(props) => props.theme.spacings.md} 0;
  border-radius: ${(props) => props.theme.borderRadius};
  font-weight: bold;
  transition: all 0.3s linear;
`
