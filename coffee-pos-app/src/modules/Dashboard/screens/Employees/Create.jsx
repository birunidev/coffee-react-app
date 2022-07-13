import { Gap, ImagePicker, InputField, Select } from "components";
import { useFormik } from "formik";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { CreateEmployee } from "modules/Dashboard/infrastructure/schemes";
import React from "react";

export default function Create() {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      username: "",
      phone_number: "",
      profile_picture: "",
      password: "",
    },
    onSubmit: () => {},
    validationSchema: CreateEmployee,
  });

  const buttonHandler = () => {};
  return (
    <DashboardLayout activePage="Employees">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Save new employee"
        hasButton={true}
      />
      <div className="lg:flex mt-4 p-[30px] rounded-xl bg-white min-h-[100vh]">
        <div className="w-full lg:mr-4 xl:mr-10">
          <InputField
            label="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.errors.name}
            onBlur={formik.handleBlur}
          />
          <Gap height={20} />
          <InputField
            label="Email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
            onBlur={formik.handleBlur}
          />
          <Gap height={20} />
          <InputField
            label="Username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.errors.username}
            onBlur={formik.handleBlur}
          />
          <Gap height={20} />
          <InputField
            label="Phone Number"
            type="number"
            name="phone_number"
            value={formik.values.phone_number}
            onChange={formik.handleChange}
            error={formik.errors.phone_number}
            onBlur={formik.handleBlur}
          />
          <Gap height={20} />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="lg:w-1/3">
          <Select
            label="Role"
            options={[
              {
                title: "Admin",
                value: "ADMIN",
              },
              {
                title: "User",
                value: "USER",
              },
            ]}
          />
          <Gap height={20} />
          <ImagePicker label="Profile Picture" />
        </div>
      </div>
    </DashboardLayout>
  );
}
