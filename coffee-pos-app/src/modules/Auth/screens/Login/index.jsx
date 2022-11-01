import { Gap, InputField } from "components";
import { Button, Spinner } from "flowbite-react";
import { useFormik } from "formik";
import authAPI from "modules/Auth/infrastructure/api";
import { LoginSchema } from "modules/Auth/infrastructure/schemas";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuth } from "store/slice/authSlice";

export default function Login() {
  // const auth = useSelector(state=> state.auth);
  const history = useHistory();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, action) => {
      action.setSubmitting(true);
      try {
        const res = await authAPI.login(values);
        console.log(res);
        dispatch(setAuth({ accessToken: res.access_token }));
        toast.success("Authorized");
        history.push("/cp-admin");
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: LoginSchema,
  });

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="bg-white min-w-[580px] pb-[100px] rounded-xl px-[40px]">
        <img
          src="/assets/logo.png"
          className="w-[100px] mx-auto translate-y-[-40px] rounded"
          alt=""
        />
        <div className="text-center pt-[50px] ">
          <h1 className="font-bold text-3xl">Welcome Back !</h1>
          <p>Let’s make a report today</p>
        </div>
        <form className="mt-[90px]" onSubmit={formik.handleSubmit}>
          <InputField
            label="Email Address"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.errors.email}
            onBlur={formik.handleBlur}
            type="email"
          />
          <Gap height={20} />
          <InputField
            label="Password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.errors.password}
            onBlur={formik.handleBlur}
            type="password"
          />
          <Gap height={30} />
          {formik.isSubmitting ? (
            <Button
              size="lg"
              type="submit"
              color="success"
              disabled
              style={{ fontWeight: "bold", width: "100%" }}
            >
              <div className="mr-3">
                <Spinner size="sm" light={true} />
              </div>
              Loading...
            </Button>
          ) : (
            <Button
              size="lg"
              type="submit"
              color="success"
              style={{ fontWeight: "bold", width: "100%" }}
            >
              Log in to admin panel
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
