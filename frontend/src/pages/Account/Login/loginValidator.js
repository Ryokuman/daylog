import { idRegular } from "@utils/regexs";
import { object, string } from "yup";

const loginValidator = object().shape({
  id: string()
    .min(5, false)
    .max(20, "옳지 않은 아이디입니다..")
    .matches(idRegular, "옳지 않은 아이디입니다..")
    .required("아이디를 입력해 주십시오"),
  password: string().required("비밀번호를 입력해 주십시오"),
});

export default loginValidator;
