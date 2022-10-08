import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: ${(props) => props.width};
  background-color: ${(props) => props.color};
  background-image: ${(props) => props.img};
  flex-direction: ${(props) => props.direction || "column"};
  margin: ${(props) => props.margin || "auto"};
  text-align: center;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"};
  box-shadow: ${(props) => props.shadow};
  flex-wrap: ${(props) => props.flexWrap};
`;

export default Container;
