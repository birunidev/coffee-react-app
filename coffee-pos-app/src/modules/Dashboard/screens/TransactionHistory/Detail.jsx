import { PencilAltIcon } from "@heroicons/react/outline";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React from "react";
import { useHistory } from "react-router-dom";

export default function TransactionDetail() {
  const history = useHistory();
  const buttonHandler = () => {
    history.push(RouteName.ADD_NEW_MENU);
  };

  return (
    <DashboardLayout activePage="History">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Print this invoice"
        hasButton={true}
      />
      <div className="mt-4 bg-white p-[30px] rounded-xl">
        <div className="flex items-center">
          <img
            src="/assets/logo.png"
            className="w-[38px] inline-block mr-4"
            alt=""
          />
          <span className="text-xl font-bold">RESTAURANT NAME</span>
        </div>
        <div className="mt-10 flex justify-between w-[88%]">
          <div className="w-1/4">
            <div className="flex justify-between mb-4">
              <p>Transaction Number</p>
              <p className="font-bold">CP429523423</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Customer Name</p>
              <p className="font-bold">Elfira Satya Pramesti</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Date</p>
              <p className="font-bold">20 Dec 2022</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Type</p>
              <p className="font-bold">DINE IN</p>
            </div>
          </div>
          <div className="w-1/4">
            <div className="flex justify-between mb-4">
              <p>Payment Method</p>
              <p className="font-bold">QRIS</p>
            </div>
            <div className="flex justify-between mb-4">
              <p>Status</p>
              <p className="flex items-center">
                <span className="font-bold bg-[#D4FFEE] text-primary-500 px-6 py-3 rounded-full">
                  PAID
                </span>
                <button className="ml-2">
                  <PencilAltIcon className="w-[20px]" />
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <p>Ordered Menu</p>
          <table className="w-full mt-5">
            <thead>
              <tr>
                <th className="text-left py-4">No</th>
                <th className="text-left">Menu</th>
                <th className="text-left">Quantity</th>
                <th className="text-left">Description</th>
                <th className="text-left">Total</th>
              </tr>
              <tr>
                <td>1</td>
                <td className="flex">
                  <img
                    src="/assets/product-1.png"
                    className="w-[100px]"
                    alt=""
                  />
                  <div className="ml-4">
                    <p className="font-bold">Caramel Machiato</p>
                    <p>Rp 29,000</p>
                  </div>
                </td>
                <td>1x</td>
                <td>Extra Ice</td>
                <td>Rp 29,000</td>
              </tr>
              <tr className="text-lg">
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold pt-4 text-left">SubTotal</td>
                <td>Rp 29,000</td>
              </tr>
              <tr className="text-lg">
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold pt-4 text-left">Tax (10%)</td>
                <td>Rp 2,900</td>
              </tr>
              <tr className="text-xl">
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold pt-4 text-left">Grand Total</td>
                <td>Rp 39,900</td>
              </tr>
              <tr className="text-xl">
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold pt-4 text-left">Payment</td>
                <td>Rp 50,000</td>
              </tr>
              <tr className="text-xl">
                <td></td>
                <td></td>
                <td></td>
                <td className="font-bold pt-4 text-left">Change</td>
                <td>Rp 20,000</td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
