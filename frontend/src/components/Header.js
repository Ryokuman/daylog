import * as S from "@components";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import url from "@utils/url";
import { tokenSlice } from "@stores";
import { useDispatch } from "react-redux";

const LinkImg = (props) => {
  return (
    <a href={props.href} onClick={props.onClick}>
      <S.CustomIMG img={props.img} width="28px" height="28px" display="inline" margin="0 20px 0 0 " />
    </a>
  );
};

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => setSearchValue(e.target.value);
  const onClick = () => {
    dispatch(tokenSlice.actions.deleteToken());
    navigate("/");
  };
  const onSubmit = () => navigate(`../post/${searchValue}`);

  return (
    <div>
      <S.Container justifyContent="space-between" shadow="1px 1px 5px black" direction="row">
        <a href={url}>
          <S.CustomIMG img="logo" width="120px" height="40px" margin="0px 80px" />
        </a>
        <S.Box
          borderRadius="10px"
          width="400px"
          height="40px"
          color="#ECEAEA"
          direction="row"
          justifyContent="space-between"
          margin="10px"
        >
          <S.CustomIMG img="search" width="20px" height="20px" margin="0 0 0 10px" />
          <S.CustomForm onSubmit={onSubmit}>
            <S.TextField
              onChange={onChange}
              width="350px"
              color="inherit"
              border="inherit"
              margin="2px 5px 2px 3px"
              placeholder="검색"
            />
          </S.CustomForm>
        </S.Box>
        <S.Container direction="row" margin="0 80px 0 0">
          <LinkImg img="notification" href="../notification/" />
          <LinkImg img="friends" href="../friends/" />
          <LinkImg img="explore" href="../search/" />
          <LinkImg img="logout" onClick={onClick} />
        </S.Container>
      </S.Container>
      <Outlet />
    </div>
  );
}

export default Header;
