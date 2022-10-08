import * as S from "@components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "@utils/api";
import spaceRemover from "@utils/spaceRemover";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpValidator from "./signUpValidator";

function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onBlur", resolver: yupResolver(signUpValidator) });

  const watcher = watch(["id", "email", "nickName", "password"]);
  const inputChecker = watcher.includes("") || watcher.includes(undefined) || Object.values(errors)[0];

  const onSubmit = async (data) => {
    await api.post(`/users/`, data);
    alert("회원가입 성공! 로그인 페이지로 이동합니다.");
    navigate("/account/login");
  };

  return (
    <S.Container margin="130px auto">
      <S.Box width="350px" height="400px">
        <S.CustomIMG margin="28px auto 36px auto" img="logo" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <S.TextField placeholder="ID" {...register("id")} onChange={spaceRemover} />
          <S.TextField onChange={spaceRemover} placeholder="Email" {...register("email")} />
          <S.TextField onChange={spaceRemover} placeholder="Nick Name" {...register("nickName")} />
          <S.TextField type="password" onChange={spaceRemover} placeholder="Password" {...register("password")} />
          <S.Button
            width="258px"
            height="30px"
            margin="20px auto"
            type="submit"
            activate={!inputChecker}
            disabled={inputChecker}
          >
            가입
          </S.Button>
        </form>
      </S.Box>
      <S.Box margin="25px auto" width="350px" height="63px" direction="row">
        <S.Typography>계정이 있으신가요?&nbsp;</S.Typography>
        <S.StyledLink to="/account/login">
          <S.Typography>로그인</S.Typography>
        </S.StyledLink>
      </S.Box>
    </S.Container>
  );
}

export default SignUp;
