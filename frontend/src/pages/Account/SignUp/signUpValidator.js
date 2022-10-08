import { idRegular, nickNameRegular, passwordRegular } from "@utils/regexs";
import { object, string } from "yup";
import api from "@utils/api";

const isDuplicate = async (data, ctx) => {
  const response = await api.get(`/users/?case=${ctx.path}&value=${data}`);
  if (!response.data.result) return ctx.createError({ message: `중복된 ${ctx.path} 입니다.` });
  return true;
};

const signUpValidator = object().shape({
  id: string()
    .min(5, "아이디가 너무 짧습니다.")
    .max(20, "아이디가 너무 깁니다.")
    .matches(idRegular, "아이디엔 영문, 숫자만 사용 가능합니다.")
    .required()
    .test(isDuplicate),
  email: string().email("옳지 않은 이메일입니다.").required().test(isDuplicate),
  nickName: string()
    .min(5, "닉네임이 너무 짧습니다.")
    .max(20, "닉네임이 너무 깁니다.")
    .matches(nickNameRegular, "닉네임엔 특수문자 사용이 불가합니다.")
    .required()
    .test(isDuplicate),
  password: string()
    .matches(
      passwordRegular,
      "비밀번호는 특수문자, 숫자, 영어 대,소문자를 각각 1개씩 포함하여야하며, 8자 이상이여야 합니다"
    )
    .required(),
});

export default signUpValidator;
