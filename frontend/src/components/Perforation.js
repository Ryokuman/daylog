import styled from "styled-components";

const Line = styled.div`
  width: 104.758px;
  height: 1px;
  background-color: #ededed;
  margin: auto;
`;

const Body = styled.div`
  display: flex;
  margin: 0 auto;
  width: inherit;
`;

const Text = styled.p`
  color: #9d9d9d;
`;

function Perforation(props) {
  return (
    <Body>
      <Line />
      <Text>{props.value}</Text>
      <Line />
    </Body>
  );
}

export default Perforation;
