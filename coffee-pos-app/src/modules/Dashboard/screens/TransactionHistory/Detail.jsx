import { PencilAltIcon } from "@heroicons/react/outline";
import CheckoutLoading from "modules/Cashier/components/CheckoutModal/CheckoutLoading";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { transactionAPI } from "modules/Dashboard/infrastructure/api";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React, { useState } from "react";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useHistory, useParams } from "react-router-dom";

function formatThousand(value) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export default function TransactionDetail() {
  const history = useHistory();
  const params = useParams();
  const { tx_number } = params;
  const [transaction, setTransaction] = useState(null);
  const [numbers, setNumbers] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    transactionAPI.show(tx_number).then((res) => {
      setTransaction(res.data.result);
      setNumbers({
        subTotal: res.data.subTotal,
        taxVal: res.data.taxVal,
        total: res.data.total,
      });
      setLoading(false);
    });
  }, []);

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

      {loading ? (
        <CheckoutLoading />
      ) : (
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
                <p className="font-bold">{transaction.tx_number}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Customer Name</p>
                <p className="font-bold">{transaction.customer_name}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Date</p>
                <p className="font-bold">
                  {new Date(transaction.created_at).toDateString()}
                </p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Type</p>
                <p className="font-bold">{transaction.type}</p>
              </div>
            </div>
            <div className="w-1/4">
              <div className="flex justify-between mb-4">
                <p>Payment Method</p>
                <p className="font-bold">{transaction.payment_method}</p>
              </div>
              <div className="flex justify-between mb-4">
                <p>Status</p>
                <p className="flex items-center">
                  <span className="font-bold bg-[#D4FFEE] text-primary-500 px-6 py-3 rounded-full">
                    {transaction.status}
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
                {transaction.ordered_menus.map((ordered_menu, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td className="flex">
                        <img
                          src={ordered_menu.product.thumbnail}
                          className="w-[100px]"
                          alt=""
                        />
                        <div className="ml-4">
                          <p className="font-bold">
                            {ordered_menu.product.title_product}
                          </p>
                          <p>
                            Rp{" "}
                            {new Intl.NumberFormat("id-ID").format(
                              ordered_menu.product.price
                            )}
                          </p>
                        </div>
                      </td>
                      <td>{ordered_menu.quantity}x</td>
                      <td>{ordered_menu.description}</td>
                      <td>
                        Rp{" "}
                        {new Intl.NumberFormat("id-ID").format(
                          ordered_menu.product.price * ordered_menu.quantity
                        )}
                      </td>
                    </tr>
                  );
                })}

                <tr className="text-lg">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold pt-4 text-left">SubTotal</td>
                  <td>Rp {formatThousand(numbers.subTotal)}</td>
                </tr>
                <tr className="text-lg">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold pt-4 text-left">Tax (10%)</td>
                  <td>Rp {formatThousand(numbers.taxVal)}</td>
                </tr>
                <tr className="text-xl">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold pt-4 text-left">Grand Total</td>
                  <td>Rp {formatThousand(numbers.total)}</td>
                </tr>
                <tr className="text-xl">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold pt-4 text-left">Payment</td>
                  <td>Rp {formatThousand(transaction.paid)}</td>
                </tr>
                <tr className="text-xl">
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="font-bold pt-4 text-left">Change</td>
                  <td>Rp {formatThousand(transaction.change)}</td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
