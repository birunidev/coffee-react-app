import { Gap, ImagePicker, InputField, Select } from "components";
import { useFormik } from "formik";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { categoryAPI, productAPI } from "modules/Dashboard/infrastructure/api";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import slugify from "slugify";
import { updateProduct } from "store/slice/productSlice";

export default function Edit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [mediaUrl, setMediaUrl] = useState("");
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    title_product: "",
    code_product: "",
    price: "",
    sale_price: "",
    category_id: categories.length > 0 ? categories[0].id : 1,
  });

  const updateMenuBtn = useRef();

  useEffect(() => {
    productAPI.getSingle(id).then((res) => {
      setProduct(res.data);
      setMediaUrl(res.data.thumbnail);
    });
  }, [id]);

  const formik = useFormik({
    initialValues: {
      title_product: product?.title_product ?? "",
      code_product: product?.code_product ?? "",
      price: product?.price ?? 0,
      sale_price: product?.sale_price,
      category_id: product.category_id,
    },
    onSubmit: (values) => {
      let data = {
        ...values,
        slug: slugify(values.title_product),
        thumbnail: mediaUrl,
        category_id: parseInt(values.category_id),
      };
      dispatch(
        updateProduct({
          id: id,
          formData: data,
          toast,
        })
      );
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    categoryAPI.get().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const buttonHandler = () => {
    updateMenuBtn.current.click();
  };
  return (
    <DashboardLayout setMediaUrl={setMediaUrl} activePage="Menu">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Update menu"
        hasButton={true}
      />
      <form onSubmit={formik.handleSubmit}>
        <div className="lg:flex mt-4 p-[30px] rounded-xl bg-white min-h-[100vh]">
          <div className="w-full lg:mr-4  xl:mr-10">
            <InputField
              label="Title Product"
              name="title_product"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter product title"
              type="text"
              error={formik.errors.title_product}
              value={formik.values.title_product}
            />
            <Gap height={20} />
            <InputField
              label="Code Product"
              name="code_product"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter product code"
              type="text"
              error={formik.errors.code_product}
              value={formik.values.code_product}
            />
            <Gap height={20} />
            <InputField
              label="Price"
              name="price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter product price"
              type="text"
              error={formik.errors.price}
              value={formik.values.price}
            />
            <Gap height={20} />
            <InputField
              label="Sale Price"
              name="sale_price"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter product sale_price"
              type="text"
              error={formik.errors.sale_price}
              value={formik.values.sale_price}
            />
          </div>
          <div className="lg:w-1/3">
            <Select
              name="category_id"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="Categories"
              value={formik.values.category_id}
              options={categories}
            />
            <Gap height={20} />
            <ImagePicker mediaUrl={mediaUrl} label="Thumbnail" />
          </div>
        </div>
        <button ref={updateMenuBtn} type="submit">
          Test
        </button>
      </form>
    </DashboardLayout>
  );
}
