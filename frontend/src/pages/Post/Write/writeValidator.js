import { object, string, mixed } from "yup";

const writeValidator = object().shape({
  title: string().max(20).required(),
  contents: string().max(1024).required(),
  image: mixed().required(),
});

export default writeValidator;
