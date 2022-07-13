import * as Yup from "yup";

const LoginSchema = Yup.object({
  email: Yup.string().required().email(),
  password: Yup.string().required().min(8),
});

export default LoginSchema;
