import * as Yup from "yup";

const CreateMenu = Yup.object({
  title_product: Yup.string().required().max(50),
  code_product: Yup.string().required().max(10),
  price: Yup.number().required(),
  sale_price: Yup.number().required(),
  category_id: Yup.number().required(),
});

export default CreateMenu;
