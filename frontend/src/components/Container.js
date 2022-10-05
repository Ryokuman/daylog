import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.direction ? props.direction : "column")};
  margin: ${(props) => (props.margin ? props.margin : "auto")};
  text-align: center;
  align-items: center;
  justify-content: center;
`;

export default Container;
