import styled from "styled-components";

const Container = styled.div`
  display: ${(props) => props.display || "flex"};
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
  overflow: ${(props) => (props.isScroll ? "auto" : "")};
  overflow-x: ${(props) => (props.isScroll ? "hidden" : "")};
`;

export default Container;
