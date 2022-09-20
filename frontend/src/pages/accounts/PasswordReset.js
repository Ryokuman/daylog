import * as S from "@components";
import { useState } from "react";

function ResetPasswordCard() {
    const [dataForReset, setDataForReset] = useState(null);

    const onChangeValue = (e) => {
        setDataForReset(e.target.value);
    };

    const onSendRequestButtonClick = () => {
        console.log("clicked");
    };

    return (
        <S.Container width="350px" height="400px">
            <S.ResetPasswordImg margin="17.5px auto 3px auto" />
            <h4 style={{ margin: "5px 0px 0px 0px" }}>
                로그인에 문제가 있나요?
            </h4>
            <S.Typography style={{ marginTop: "2px" }}>
                이메일 주소, 전화번호 또는 사용자 이름을 입력하시면
                <br />
                계정에 다시 액세스할 수 있는 링크를 보내드립니다.
            </S.Typography>
            <S.TextFiled placeholder="email" onChange={onChangeValue} />
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
            <S.StyledLink to="/accounts/login">
                <S.Typography>로그인으로 돌아가기</S.Typography>
            </S.StyledLink>
        </S.Container>
    );
}

function GoToSignupCard() {
    return (
        <S.Container width="350px" height="63px" direction="row">
            <div style={{ margin: "auto", display: "flex" }}>
                <S.Typography>계정이 없으신가요?&nbsp;</S.Typography>
                <S.StyledLink to="/accounts/signup">
                    <S.Typography>가입하기</S.Typography>
                </S.StyledLink>
            </div>
        </S.Container>
    );
}

function PasswordReset() {
    return (
        <div style={{ margin: "130px auto" }}>
            <ResetPasswordCard />
            <div style={{ margin: "25px" }} />
            <GoToSignupCard />
        </div>
    );
}

export default PasswordReset;
