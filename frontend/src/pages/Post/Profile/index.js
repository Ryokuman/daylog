import { getFullMonth, addMonth, subMonth } from "@utils/dateHandler";
import * as S from "@components";
import api from "@utils/api";

import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function Calendar(props) {
  const fullMonth = getFullMonth(props.date);
  const userData = useSelector((state) => state.user.userData);
  const postDate = useRef([]);

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getPosts() {
      postDate.current = [];
      const newDate = `${props.date.getFullYear()}-${props.date.getMonth() + 1}`;
      const uuid = await userData.uuid;
      const res = await api.get(`http://localhost:8080/api/post/?case=profile&userPk=${uuid}&date=${newDate}`);

      res.data.forEach((post) => {
        const number = new Date(post.date).getDate();
        postDate.current.push(number);
      });
      setPosts(res.data);
    }
    getPosts();
  }, [props.date]);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let number = 0;
  let postIndex = 1;

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
          if (e) {
            number++;

            if (postDate.current.includes(number)) {
              const num = parseInt(posts.length) - postIndex;
              const image_url = posts[num]?.image;
              const link_url = posts[num]?.post_pk;
              const title = posts[num]?.title;
              postIndex++;
              return <S.DateForm key={i} activate={e} image={image_url} link={link_url} value={title} />;
            }
          }
          const thisDate = new Date(props.date);
          const link_url = `${thisDate.getFullYear()}-${thisDate.getMonth() + 1}-${number}`;
          return <S.DateForm key={i} activate={e} date={number} link={link_url} />;
        })}
      </S.Container>
    </S.Container>
  );
}

function DateChangeButtons(props) {
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

function Profile() {
  const [date, setDate] = useState(new Date());
  const userData = useSelector((state) => state.user.userData);

  return (
    <S.Container direction="row" alignItems="flex-start">
      <S.Container margin="10px 0 0 120px">
        <S.Container width="900px" direction="row" justifyContent="space-between">
          <Title date={date} />
          <DateChangeButtons state={[date, setDate]} />
        </S.Container>
        <Calendar date={date} />
      </S.Container>
      <S.Container margin="0px 100px">
        <S.Box borderRadius="100%" width="180px" height="180px" img={""} margin="100px auto 30px auto" />
        <S.Typography>{userData.id}</S.Typography>
        <S.Container direction="row" margin="30px auto">
          <FollowCard follow num={100} />
          <FollowCard follower num={100} />
          <FollowButton isFollowed />
        </S.Container>
      </S.Container>
    </S.Container>
  );
}

export default Profile;
