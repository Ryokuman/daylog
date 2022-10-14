import { object, mixed } from "yup";

const modifyValidator = object().shape({
  image: mixed().required(),
});

export default modifyValidator;
