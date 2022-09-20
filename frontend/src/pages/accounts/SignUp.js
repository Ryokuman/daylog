import * as S from "@components";
import { useState } from "react";

function SignUpCard() {
    const [id, setID] = useState(null);
    const [pw, setPW] = useState(null);
    const [fullName, setFullName] = useState(null);
    const [username, setUsername] = useState(null);

    const checkInput = id && pw && fullName && username;

    const onChangeValue = (e) => {
        if (e.target.placeholder === "ID") {
            setID(e.target.value);
        } else if (e.target.placeholder === "Full Name") {
            setFullName(e.target.value);
        } else if (e.target.placeholder === "Username") {
            setUsername(e.target.value);
        } else if (e.target.placeholder === "PASSWORD") {
            setPW(e.target.value);
        }
    };

    const onSignUpButtonClick = () => {
        console.log("clicked");
    };

    return (
        <S.Container width="350px" height="400px">
            <S.Logo margin="36px" />
            <S.TextFiled placeholder="ID" onChange={onChangeValue} />
            <S.TextFiled placeholder="Full Name" onChange={onChangeValue} />
            <S.TextFiled placeholder="Username" onChange={onChangeValue} />
            <S.TextFiled
                placeholder="PASSWORD"
                type="password"
                onChange={onChangeValue}
            />
            <S.Button
                width="258px"
                height="30px"
                margin="20px auto"
                onClick={onSignUpButtonClick}
                activate={checkInput}
                disabled={!checkInput}
            >
                가입
            </S.Button>
        </S.Container>
    );
}

function GoToLoginCard() {
    return (
        <S.Container width="350px" height="63px" direction="row">
            <div style={{ margin: "auto", display: "flex" }}>
                <S.Typography>계정이 있으신가요?&nbsp;</S.Typography>
                <S.StyledLink to="/accounts/login">
                    <S.Typography>로그인</S.Typography>
                </S.StyledLink>
            </div>
        </S.Container>
    );
}

function SignUp() {
    return (
        <div style={{ margin: "130px auto" }}>
            <SignUpCard />
            <div style={{ margin: "25px" }} />
            <GoToLoginCard />
        </div>
    );
}

export default SignUp;
