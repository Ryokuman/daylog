import * as S from "@components";
import { useForm } from "react-hook-form";
import api from "@utils/api";
import spaceRemover from "@utils/spaceRemover";
import { tokenSlice } from "@stores";
import { getInitialState } from "@stores/userSlice";

import { yupResolver } from "@hookform/resolvers/yup";
import loginValidator from "./loginValidator";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRef } from "react";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(loginValidator) });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const is_valid_data = useRef(true);
  const watcher = watch(["id", "password"]);
  const inputChecker = watcher.includes("") || watcher.includes(undefined) || Object.values(errors)[0];

  const onSubmit = async (data) => {
    try {
      const res = await api.post(`/auth/`, data);
      await dispatch(tokenSlice.actions.accessToken(res.data.accessToken));
      await dispatch(tokenSlice.actions.refreshToken(res.data.refreshToken));
      await dispatch(getInitialState());
      navigate("/");
    } catch (errors) {
      is_valid_data.current = false;
    }
  };

  return (
    <S.Container margin="130px auto">
      <S.Box width="350px" height="400px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.CustomIMG img="logo" margin="36px auto" />
          <S.TextField placeholder="ID" onChange={spaceRemover} {...register("id")} />
          <S.TextField placeholder="PASSWORD" type="password" onChange={spaceRemover} {...register("password")} />
          {is_valid_data.current || (
            <S.Typography color="#DF5659" margin="1.5px auto">
              아이디와 패스워드를 확인해 주십시오
            </S.Typography>
          )}
          <S.Button
            width="258px"
            height="30px"
            type="submit"
            margin={is_valid_data.current ? "20px auto" : "0 auto 20px 0"}
            activate={!inputChecker}
            disabled={inputChecker}
          >
            로그인
          </S.Button>
        </form>
        <S.Perforation value="또는" />
        <S.StyledLink to="/account/password/reset">
          <S.Typography>비밀번호를 잊으셨나요?</S.Typography>
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

export default Login;
