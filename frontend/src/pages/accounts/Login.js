import * as S from "../../components";
import { useState } from "react";

function LoginCard() {
    const [id, setID] = useState(null);
    const [pw, setPW] = useState(null);

    const checkInput = id && pw;

    const onChangeValue = (e) => {
        if (e.target.type === "password") {
            setPW(e.target.value);
        } else {
            setID(e.target.value);
        }
    };

    const onLoginButtonClick = () => {
        console.log("clicked");
    };

    return (
        <S.Container width="350px" height="400px">
            <S.Logo margin="36px" />
            <S.TextFiled placeholder="ID" onChange={onChangeValue} />
            <S.TextFiled
                placeholder="PASSWORD"
                type="password"
                onChange={onChangeValue}
            />
            <S.Button
                width="258px"
                height="30px"
                margin="20px auto"
                onClick={onLoginButtonClick}
                activate={checkInput}
                disabled={!checkInput}
            >
                로그인
            </S.Button>
            <S.Perforation value="또는" />
            <S.StyledLink to="/accounts/password/reset/">
                <S.Typography>비밀번호를 잊으셨나요?</S.Typography>
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

function Login() {
    return (
        <div style={{ margin: "130px auto" }}>
            <LoginCard />
            <div style={{ margin: "25px" }} />
            <GoToSignupCard />
        </div>
    );
}

export default Login;
