import { PrinterIcon } from "@heroicons/react/outline";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import { RouteName as CashierRouteName } from "modules/Cashier/infrastructure/routes/routeName";
import React from "react";
import { Link, useHistory } from "react-router-dom";

export default function TransactionHistory() {
  const history = useHistory();
  const buttonHandler = () => {
    history.push(CashierRouteName.TRANSACTION);
  };

  return (
    <DashboardLayout activePage="History">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Add new order"
        hasButton={true}
      />
      <div className="mt-4 bg-white p-[30px] rounded-xl">
        <p>
          Show{" "}
          <select
            name=""
            className="ring-transparent outline-none border-none focus:outline-none focus:ring-transparent"
            id=""
          >
            <option value="10">10</option>
          </select>{" "}
          Entries
        </p>
        <div>
          <table className="mt-4 w-full my-table">
            <thead>
              <tr className="border-y-2 border-black py-3 ">
                <th className="py-3 px-4">No</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Ordered Menu</th>
                <th className="text-left">Date</th>
                <th className="text-left">Status</th>
                <th className="text-left">Total</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[30px] pl-4 py-3">1</td>
                <td>Muhammad Al Biruni</td>
                <td>Caramel Machiato L 1x</td>
                <td>20 March 2022</td>
                <td>DONE</td>
                <td>Rp. 59,000</td>
                <td className="flex items-center ">
                  <Link
                    to={RouteName.TRANSACTION_DETAIL}
                    className="py-3 px-7 bg-[#EFEFEF] rounded-full mt-2 inline-block"
                  >
                    Detail
                  </Link>
                  <button className="bg-primary-500 py-2 px-3 text-white rounded-xl ml-3">
                    <PrinterIcon className="w-[25px]" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="w-[30px] pl-4 py-3">1</td>
                <td>Muhammad Al Biruni</td>
                <td>Caramel Machiato L 1x</td>
                <td>20 March 2022</td>
                <td>DONE</td>
                <td>Rp. 59,000</td>
                <td className="flex items-center ">
                  <Link
                    to={`${RouteName.TRANSACTION_DETAIL}/CP34341`}
                    className="py-3 px-7 bg-[#EFEFEF] rounded-full mt-2 inline-block"
                  >
                    Detail
                  </Link>
                  <button className="bg-primary-500 py-2 px-3 text-white rounded-xl ml-3">
                    <PrinterIcon className="w-[25px]" />
                  </button>
                </td>
              </tr>
              <tr>
                <td className="w-[30px] pl-4 py-3">1</td>
                <td>Muhammad Al Biruni</td>
                <td>Caramel Machiato L 1x</td>
                <td>20 March 2022</td>
                <td>DONE</td>
                <td>Rp. 59,000</td>
                <td className="flex items-center ">
                  <Link
                    to={RouteName.TRANSACTION_DETAIL}
                    className="py-3 px-7 bg-[#EFEFEF] rounded-full mt-2 inline-block"
                  >
                    Detail
                  </Link>
                  <button className="bg-primary-500 py-2 px-3 text-white rounded-xl ml-3">
                    <PrinterIcon className="w-[25px]" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
