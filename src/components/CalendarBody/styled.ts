import styled from "styled-components"

export const Cell = styled.div`
  width: 50px;
  text-align: center;
  padding: ${(props) => props.theme.spacings.md} 0;
  border-radius: ${(props) => props.theme.borderRadius};
  cursor: pointer;
  transition: all 0.3s linear;

  &[data-isholiday="true"] {
    color: ${(props) => props.theme.green};
  }
  &[data-isweekend="true"] {
    color: ${(props) => props.theme.red};
  }
  &[data-selected="false"] {
    &:hover {
      background-color: ${(props) => props.theme.bgColor};
      color: ${(props) => props.theme.textColor};
    }
  }

  &[data-selected="true"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
  }
  &[data-prev="true"],
  &[data-next="true"] {
    color: ${(props) => props.theme.lightGray};
  }
`
