import * as S from "@components";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import url from "@utils/url";

const LinkImg = (props) => {
  return (
    <a href={props.href}>
      <S.CustomIMG img={props.img} width="28px" height="28px" display="inline" margin="0 20px 0 0 " />
    </a>
  );
};

function Header() {
  const [searchValue, setSearchValue] = useState("");
  const onChange = (e) => setSearchValue(e.target.value);

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
          <form action={`../search/${searchValue}`}>
            <S.TextField
              onChange={onChange}
              width="350px"
              color="inherit"
              border="inherit"
              margin="2px 5px 2px 3px"
              placeholder="검색"
            />
          </form>
        </S.Box>
        <S.Container direction="row" margin="0 80px 0 0">
          <LinkImg img="notification" href="../notification/" />
          <LinkImg img="friends" href="../friends/" />
          <LinkImg img="explore" href="../search/" />
        </S.Container>
      </S.Container>
      <Outlet />
    </div>
  );
}

export default Header;
