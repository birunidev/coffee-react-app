import { InputField } from "components";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function CheckoutForm({
  handleCheckout,
  total,
  selectedPayment,
}) {
  const formik = useFormik({
    initialValues: {
      customer_name: "",
      type: "",
      date: "",
      payment_method: "",
      paid: 0,
    },
    onSubmit: (values) => {
      if (total > values.paid) {
        toast.error("Not enough money");
        return;
      }
      let order_data = {
        customer_name: values.customer_name,
        status: values.paid > 0 ? "PAID" : "UNPAID",
        payment_method: selectedPayment,
        paid: values.paid,
        type: values.type,
      };
      handleCheckout(order_data);
    },
    validationSchema: Yup.object({
      customer_name: Yup.string().required(),
      paid: Yup.number().required(),
    }),
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="container mx-auto space-y-5 py-5"
    >
      <InputField
        value={formik.values.customer_name}
        onChange={formik.handleChange}
        error={formik.errors.customer_name}
        name="customer_name"
        label="Customer Name"
      />
      <div>
        <p className="font-bold">Order type</p>
        <div className="mt-3 flex ">
          <div className="flex items-center mr-4">
            <input
              name="type"
              onClick={() => formik.setFieldValue("type", "DINE IN")}
              type="radio"
              id="dine-in"
              value={"DINE IN"}
              className="bg-white focus:bg-primary-500 text-primary-500 target:bg-primary-500 active:bg-primary-500  outline-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="dine-in" className="text-lg ml-4">
              Dine In
            </label>
          </div>
          <div className="flex items-center">
            <input
              name="type"
              onClick={() => formik.setFieldValue("type", "TAKE AWAY")}
              type="radio"
              id="take-away"
              value={"TAKE AWAY"}
              className="bg-white focus:bg-primary-500 text-primary-500 target:bg-primary-500 active:bg-primary-500  outline-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="take-away" className="text-lg ml-4">
              Take Away
            </label>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-bold">Total Pay</p>
        <p className="font-bold text-xl">
          Rp {new Intl.NumberFormat("id-ID").format(total)}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className="">Payment Method</p>
        <p className="">{selectedPayment}</p>
      </div>
      <div className="">
        <InputField
          name="paid"
          type="number"
          error={formik.errors.paid}
          value={formik.values.paid}
          onChange={formik.handleChange}
          label={`Customer Pay (Rp ${new Intl.NumberFormat("id-ID").format(
            formik.values.paid
          )} )`}
        />
      </div>
      <div className="flex items-center">
        <button className="py-3 w-full bg-gray-200 text-gray-500 rounded-xl font-bold mr-3">
          Cancel
        </button>
        <button
          type="submit"
          className="py-3 w-full bg-primary-500 text-white font-bold rounded-xl"
        >
          Finish this order
        </button>
      </div>
    </form>
  );
}
