import { getFullMonth, addMonth, subMonth } from "@utils/dateHandler";
import api from "@utils/api";
import * as S from "@components";
import { useState } from "react";

function Calendar(props) {
  const fullMonth = getFullMonth(props.date);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let number = 0;

  return (
    <S.Container>
      <S.Container direction="row" width="900px">
        {days.map((e, i) => {
          return (
            <S.Box width="120px" margin="2px" key={i}>
              <S.Typography margin="0px">{e}</S.Typography>
            </S.Box>
          );
        })}
      </S.Container>
      <S.Container direction="row" width="900px" flexWrap="wrap">
        {fullMonth.map((e, i) => {
          if (e) number++;
          return <S.DateForm key={i} activate={e} date={number} />;
        })}
      </S.Container>
    </S.Container>
  );
}

function Buttons(props) {
  const [date, setDate] = props.state;

  const onUpClick = () => setDate(addMonth(date));
  const onDownClick = () => setDate(subMonth(date));
  const onTodayClick = () => setDate(new Date());

  return (
    <S.Container direction="row" margin="10px">
      <S.Button margin="0.5px" onClick={onDownClick} activate>
        {"<"}
      </S.Button>
      <S.Button margin="0.5px" onClick={onTodayClick} activate>
        Today
      </S.Button>
      <S.Button margin="0.5px" onClick={onUpClick} activate>
        {">"}
      </S.Button>
    </S.Container>
  );
}

function FollowButton(props) {
  return (
    <S.Container margin="2px 14px">
      <S.CustomIMG width="18px" height="18px" img={props.isFollowed ? "emptyHeart" : "fullHeart"} margin="0px 10px" />
    </S.Container>
  );
}

function FollowCard(props) {
  const type = props.follow ? "followee" : props.follower ? "follower" : "";

  return (
    <S.Container margin="2px 14px">
      <S.StyledLink to={`../${type}/`}>
        <S.Typography margin="0px 10px">{props.num}</S.Typography>
        <S.Typography margin="0px 10px">{type}</S.Typography>
      </S.StyledLink>
    </S.Container>
  );
}

function Title(props) {
  const date = props.date;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return (
    <S.Typography margin="10px" size="35px" font="MaruBuri">{`${date.getFullYear()}  ${
      months[date.getMonth()]
    }`}</S.Typography>
  );
}

function Sample() {
  const [date, setDate] = useState(new Date());

  const url =
    "https://daylogbycket.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2022-07-19+%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB+10.22.35.png";
  const name = "test";

  return (
    <S.Container direction="row" alignItems="flex-start">
      <S.Container margin="10px 0 0 120px">
        <S.Container width="900px" direction="row" justifyContent="space-between">
          <Title date={date} />
          <Buttons state={[date, setDate]} />
        </S.Container>
        <Calendar date={date} />
      </S.Container>
      <S.Container margin="0px 100px">
        <S.Box borderRadius="100%" width="180px" height="180px" img={url} margin="100px auto 30px auto" />
        <S.Typography>{name}</S.Typography>
        <S.Container direction="row" margin="30px auto">
          <FollowCard follow num={100} />
          <FollowCard follower num={100} />
          <FollowButton isFollowed />
        </S.Container>
      </S.Container>
    </S.Container>
  );
}

export default Sample;
