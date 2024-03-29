import { Gap, ImagePicker, InputField, Select } from "components";
import { useFormik } from "formik";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { categoryAPI, productAPI } from "modules/Dashboard/infrastructure/api";
import { CreateMenu } from "modules/Dashboard/infrastructure/schemes";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import slugify from "slugify";
import { createProduct } from "store/slice/productSlice";

export default function Create() {
  const dispatch = useDispatch();
  const [mediaUrl, setMediaUrl] = useState("");
  const [categories, setCategories] = useState([]);

  const createMenuBtn = useRef();

  const formik = useFormik({
    initialValues: {
      title_product: "",
      code_product: "",
      price: "",
      sale_price: "",
      category_id: categories.length > 0 ? categories[0].id : 1,
    },
    onSubmit: (values) => {
      let data = {
        ...values,
        slug: slugify(values.title_product),
        thumbnail: mediaUrl,
        category_id: parseInt(values.category_id),
      };
      dispatch(
        createProduct({
          formData: data,
          toast,
        })
      );
    },
    enableReinitialize: true,
    validationSchema: CreateMenu,
  });

  useEffect(() => {
    categoryAPI.get().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const buttonHandler = () => {
    createMenuBtn.current.click();
  };
  return (
    <DashboardLayout setMediaUrl={setMediaUrl} activePage="Menu">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Save new menu"
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
        <button ref={createMenuBtn} type="submit">
          Test
        </button>
      </form>
    </DashboardLayout>
  );
}
