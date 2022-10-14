import styled from "styled-components";

const TextArea = styled.textarea`
  width: 90%;
  height: 70%;
  border: none;
  resize: none;
  border: ${(props) => props.border || "1px #EDEDED solid"};
  background-color: ${(props) => props.border || "#EDEDED"};
`;

export default TextArea;
