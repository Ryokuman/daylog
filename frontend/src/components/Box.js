import styled from "styled-components";

const Box = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  background-color: ${(props) => props.color || "white"};
  background-image: ${(props) => `url(${props.img})`};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin || "auto"};
  border: ${(props) => props.border || "1px #EDEDED solid"};
  border-radius: ${(props) => props.borderRadius};
  text-align: center;
  align-items: ${(props) => props.alignItems || "center"};
  justify-content: ${(props) => props.justifyContent || "center"}; ;
`;

export default Box;
