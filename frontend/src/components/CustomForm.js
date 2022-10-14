import styled from "styled-components";

const CustomForm = styled.form`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin || "auto"};
`;

export default CustomForm;
