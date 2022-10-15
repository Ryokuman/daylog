import styled from "styled-components";

const Button = styled.button.attrs((props) => ({ id: props.id }))`
  cursor: ${(props) => props.activate || "auto"};
  opacity: ${(props) => (props.activate ? "1" : "0.5")};
  background-color: ${(props) => props.color || "#4193EF"};
  color: ${(props) => props.textcolor || "white"};
  border-radius: 5px;
  border: ${(props) => props.border || "0px solid white"};
  width: ${(props) => props.width};
  height: ${(props) => props.height || "28px"};
  margin: ${(props) => props.margin || "0 auto"};
  font-size: 14px;
  font-weight: bold;
  &:hover {
    opacity: 0.5;
  }
`;

export default Button;
