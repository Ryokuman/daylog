import styled from "styled-components";
import Typography from "./Typography";

const DateFormDiv = styled.div`
  width: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.activate ? "white" : "#9BB7D4")};
  background-image: ${(props) => props.image && `url(${props.image})`};
  background-size: cover;
  margin: 2px;
  border: 1px #e9e9e9 solid;
  box-shadow: 1px 1px 5px #ededed;
  text-align: center;
  align-items: flex-start;
  justify-content: space-between;
  &:hover {
    transform: ${(props) => props.activate && "scale(1.5)"};
    transition-duration: ${(props) => props.activate && "0.3s"};
  }
`;

const DateForm = (props) => (
  <DateFormDiv activate={props.activate}>
    <Typography margin={"2px"}>{props.activate && props.date}</Typography>
  </DateFormDiv>
);

export default DateForm;
