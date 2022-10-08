import * as S from "@components";
import { useForm } from "react-hook-form";
import api from "@utils/api";
import spaceRemover from "@utils/spaceRemover";
import { yupResolver } from "@hookform/resolvers/yup";
import loginValidator from "./loginValidator";
import { tokenSlice } from "@stores";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(loginValidator) });
  const cookiiii = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const watcher = watch(["id", "password"]);
  const inputChecker = watcher.includes("") || watcher.includes(undefined) || Object.values(errors)[0];

  const onSubmit = async (data) => {
    const result = await api.post(`/users/auth`, data);
    dispatch(tokenSlice.actions.accessToken(result.data.accessToken));
    dispatch(tokenSlice.actions.refreshToken(result.data.refreshToken));
    console.log(result);
  };

  console.log(cookiiii);

  return (
    <S.Container margin="130px auto">
      <S.Box width="350px" height="400px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.CustomIMG img="logo" margin="36px auto" />
          <S.TextField placeholder="ID" onChange={spaceRemover} {...register("id")} />
          <S.TextField placeholder="PASSWORD" type="password" onChange={spaceRemover} {...register("password")} />
          <S.Button
            width="258px"
            height="30px"
            type="submit"
            margin="20px auto"
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
