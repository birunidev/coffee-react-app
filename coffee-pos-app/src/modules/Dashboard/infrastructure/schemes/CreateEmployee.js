import * as Yup from "yup";

const CreateEmployee = Yup.object({
  name: Yup.string().required().max(50),
  username: Yup.string().required().max(50),
  email: Yup.string().required().max(50),
  password: Yup.string().required(),
});

export default CreateEmployee;
