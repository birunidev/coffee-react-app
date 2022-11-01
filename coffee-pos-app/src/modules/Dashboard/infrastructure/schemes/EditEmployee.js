import * as Yup from "yup";

const EditEmployee = Yup.object({
  name: Yup.string().required().max(50),
  username: Yup.string().required().max(50),
  email: Yup.string().required().max(50),
});

export default EditEmployee;
