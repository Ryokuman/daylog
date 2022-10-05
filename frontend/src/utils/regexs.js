const passwordRegular =
  /^(?=.*[^ㄱ-ㅎ|가-힣])(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]{8,}$/gm;
const idRegular = /^[aA-zZ\d]+$/gm;
const nickNameRegular = /[aA-zZ\d]+/gm;

export { passwordRegular, idRegular, nickNameRegular };
