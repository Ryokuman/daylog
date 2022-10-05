import styled from "styled-components";

const Button = styled.button`
  cursor: ${(props) => (props.activate ? "pointer" : "auto")};
  opacity: ${(props) => (props.activate ? "1" : "0.5")};
  background-color: ${(props) => (props.color ? props.color : "#4193EF")};
  color: ${(props) => (props.textcolor ? props.textcolor : "white")};
  border-radius: 5px;
  border: ${(props) => (props.border ? props.border : "0px solid white")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => (props.margin ? props.margin : "0 auto")};
  font-size: 14px;
  font-weight: bold;
  &:hover {
    opacity: 0.5;
  }
`;

export default Button;
