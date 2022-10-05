import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  background-color: ${(props) => (props.color ? props.color : "white")};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => (props.margin ? props.margin : "auto")};
  border: ${(props) => (props.border ? props.border : "1px #EDEDED solid")};
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default Box;
