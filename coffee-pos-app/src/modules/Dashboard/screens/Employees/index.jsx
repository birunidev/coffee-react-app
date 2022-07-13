import { TrashIcon } from "@heroicons/react/outline";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Employees() {
  const history = useHistory();
  const buttonHandler = () => {
    history.push(RouteName.ADD_NEW_EMPLOYEE);
  };

  return (
    <DashboardLayout activePage="Employees">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Add new employee"
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
                <th className="text-left">Name</th>
                <th className="text-left">Employee Code</th>
                <th className="text-left">Role</th>
                <th className="text-left">Joined Date</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="w-[30px] pl-4 py-3">1</td>
                <td>Muhammad Al Biruni</td>
                <td>#SB89272</td>
                <td>Admin</td>
                <td>20 March 2022</td>
                <td className="flex items-center">
                  <button className="py-2 px-6 text-[#007042] bg-[#D4FFEE] mt-4 rounded-lg mr-3">
                    Edit
                  </button>
                  <button className="py-2 px-3 rounded-lg text-[#DA0A0A] bg-[#FFD4D4] mt-4">
                    <TrashIcon className="w-[20px]" />
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
