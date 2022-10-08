import * as S from "@components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordReset() {
  const [dataForReset, setDataForReset] = useState(null);
  const navigate = useNavigate();

  const onChangeValue = (e) => {
    setDataForReset(e.target.value);
  };

  const onSendRequestButtonClick = () => {
    console.log("clicked");
    alert("미구현, 메인 페이지로 돌아갑니다.");
    navigate("/");
  };

  return (
    <S.Container margin="130px auto">
      <S.Box width="350px" height="400px">
        <S.CustomIMG img="resetPassword" margin="17.5px auto 3px auto" width="70px" height="70px" />
        <h4 style={{ margin: "5px 0px 0px 0px" }}>로그인에 문제가 있나요?</h4>
        <S.Typography style={{ marginTop: "2px" }}>
          이메일 주소, 전화번호 또는 사용자 이름을 입력하시면
          <br />
          계정에 다시 액세스할 수 있는 링크를 보내드립니다.
        </S.Typography>
        <S.TextField placeholder="email" onChange={onChangeValue} />
        <S.Button
          width="258px"
          height="30px"
          margin="20px auto"
          onClick={onSendRequestButtonClick}
          activate={dataForReset}
          disabled={!dataForReset}
        >
          로그인 링크 보내기
        </S.Button>
        <S.Perforation value="또는" />
        <S.StyledLink to="/account/login">
          <S.Typography>로그인으로 돌아가기</S.Typography>
        </S.StyledLink>
      </S.Box>
      <S.Box margin="25px auto" width="350px" height="63px" direction="row">
        <S.Typography>계정이 없으신가요?&nbsp;</S.Typography>
        <S.StyledLink to="/account/signup">
          <S.Typography>가입하기</S.Typography>
        </S.StyledLink>
      </S.Box>
    </S.Container>
  );
}

export default PasswordReset;
