import { Gap, ImagePicker, InputField, Select } from "components";
import { useFormik } from "formik";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { userAPI } from "modules/Dashboard/infrastructure/api";
import {
  CreateEmployee,
  EditEmployee,
} from "modules/Dashboard/infrastructure/schemes";
import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateUser } from "store/slice/userSlice";

export default function Edit() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [mediaUrl, setMediaUrl] = useState("");
  const updateEmployeeBtn = useRef(null);

  useEffect(() => {
    userAPI.getSingle(id).then((res) => {
      setUser(res.data);
      setMediaUrl(res.data.profile_picture);
    });
  }, []);
  console.log(user);
  const formik = useFormik({
    initialValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      username: user?.username ?? "",
      phone_number: user?.phone_number ?? "",
      role: user?.role ?? "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(
        updateUser({
          id,
          formData: {
            ...values,
            profile_picture: mediaUrl,
          },
          toast,
        })
      );
    },
    validationSchema: EditEmployee,
    enableReinitialize: true,
  });

  const buttonHandler = () => {
    updateEmployeeBtn.current.click();
  };
  return (
    <DashboardLayout setMediaUrl={setMediaUrl} activePage="Employees">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Update employee"
        hasButton={true}
      />
      <form onSubmit={formik.handleSubmit}>
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
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.errors.password}
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
          </div>
          <div className="lg:w-1/3">
            <Select
              label="Role"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
              options={[
                {
                  title: "Admin",
                  id: "ADMIN",
                },
                {
                  title: "User",
                  id: "USER",
                },
              ]}
            />
            <Gap height={20} />
            <ImagePicker mediaUrl={mediaUrl} label="Profile Picture" />
          </div>
        </div>
        <button ref={updateEmployeeBtn} type="submit">
          Test
        </button>
      </form>
    </DashboardLayout>
  );
}
