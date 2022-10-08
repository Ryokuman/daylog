import styled from "styled-components";

const Typography = styled.p`
  font-size: ${(props) => props.size || "14px"};
  font-family: ${(props) => props.font || "font1"};
  color: ${(props) => props.color || "#959495"};
  margin: ${(props) => props.margin};
`;

export default Typography;
