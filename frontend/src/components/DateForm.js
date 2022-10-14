import styled from "styled-components";
import Typography from "./Typography";
import StyledLink from "./StyledLink";

const Title = styled.p`
  position: absolute;
  font-family: ${(props) => props.font || "font1"};
  color: ${(props) => props.color || "#959495"};
  margin: ${(props) => props.margin};

  font-size: ${(props) => (props.post ? "18px" : "14px")};
  width: ${(props) => props.post && "100px"};
  font-weight: ${(props) => props.post && "bold"};
  white-space: ${(props) => props.post && "nowarp"};
  overflow: ${(props) => props.post && "hidden"};
  text-overflow: ${(props) => props.post && "ellipsis"};
  text-align: ${(props) => props.post && "left"};
  z-index: 1;
`;

const DateFormImage = styled.img.attrs((props) => ({
  src: props.src,
}))`
  width: 120px;
  height: 100px;
  position: absolute;
  opacity: 0.5;
  z-index: 0;
`;

const DateFormDiv = styled.div`
  width: 120px;
  height: 100px;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.activate ? "white" : "#9BB7D4")};
  background-size: cover;
  margin: 2px;
  border: 1px #e9e9e9 solid;
  box-shadow: 1px 1px 5px #ededed;
  text-align: center;
  align-items: flex-start;
  justify-content: space-between;
  position: relative;
  &:hover {
    transform: ${(props) => props.activate && "scale(1.5)"};
    transition-duration: ${(props) => props.activate && "0.3s"};
    z-index: 2;
  }

  &:hover > img {
    opacity: 1;
    z-index: 3;
  }

  &:hover > p {
    z-index: 4;
  }
`;

const DateForm = (props) => {
  const test = props.activate && props.value && true;

  return (
    <StyledLink to={props.link && props.image ? `detail/${props.link}` : `write/${props.link}`}>
      <DateFormDiv activate={props.activate}>
        <Title color={test ? "black" : ""} post={test} margin={"2px"}>
          {props.activate && (props.value || props.date)}
        </Title>
        {props.image ? <DateFormImage src={props.image} /> : ""}
      </DateFormDiv>
    </StyledLink>
  );
};

export default DateForm;
