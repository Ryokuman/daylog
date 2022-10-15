import styled from "styled-components";

const TextArea = styled.textarea`
  width: 90%;
  height: 70%;
  resize: none;
  border: ${(props) => props.border || "1px #EDEDED solid"};
  margin: ${(props) => props.margin};
  background-color: ${(props) => props.border || "#EDEDED"};
`;

export default TextArea;
