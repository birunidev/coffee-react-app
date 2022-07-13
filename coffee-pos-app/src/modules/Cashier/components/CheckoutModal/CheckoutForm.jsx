import { InputField } from "components";
import React from "react";

export default function CheckoutForm({ handleCheckout }) {
  return (
    <div className="container mx-auto space-y-5 py-5">
      <InputField label="Customer Name" />
      <div>
        <p className="font-bold">Order type</p>
        <div className="mt-3 flex ">
          <div className="flex items-center mr-4">
            <input
              name="order_type"
              type="radio"
              id="dine-in"
              className="bg-white focus:bg-primary-500 text-primary-500 target:bg-primary-500 active:bg-primary-500  outline-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="dine-in" className="text-lg ml-4">
              Dine In
            </label>
          </div>
          <div className="flex items-center">
            <input
              name="order_type"
              type="radio"
              id="take-away"
              className="bg-white focus:bg-primary-500 text-primary-500 target:bg-primary-500 active:bg-primary-500  outline-primary-500 focus:ring-primary-500"
            />
            <label htmlFor="take-away" className="text-lg ml-4">
              Take Away
            </label>
          </div>
        </div>
      </div>
      <InputField label="Date" type="date" />
      <div className="flex items-center justify-between">
        <p className="font-bold">Total Pay</p>
        <p className="font-bold text-xl">Rp 29,000</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="">Payment Method</p>
        <p className="">Cash</p>
      </div>
      <div className="">
        <InputField label="Customer Pay" />
      </div>
      <div className="flex items-center">
        <button className="py-3 w-full bg-gray-200 text-gray-500 rounded-xl font-bold mr-3">
          Cancel
        </button>
        <button
          onClick={() => handleCheckout()}
          className="py-3 w-full bg-primary-500 text-white font-bold rounded-xl"
        >
          Finish this order
        </button>
      </div>
    </div>
  );
}
