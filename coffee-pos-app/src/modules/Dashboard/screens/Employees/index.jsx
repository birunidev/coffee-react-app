import { TrashIcon } from "@heroicons/react/outline";
import Spinner from "components/Spinner";
import dayjs from "dayjs";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getUsers } from "store/slice/userSlice";
export default function Employees() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.user);
  console.log(users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const buttonHandler = () => {
    history.push(RouteName.ADD_NEW_EMPLOYEE);
  };

  const handleUserDelete = () => {};

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
                <th className="text-left">Email</th>
                <th className="text-left">Role</th>
                <th className="text-left">Joined Date</th>
                <th className="text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={6}>
                    <Spinner />
                  </td>
                </tr>
              )}
              {users.length === 0 ? (
                <tr>
                  <th colSpan={6} className="text-center py-4">
                    Empty Users
                  </th>
                </tr>
              ) : (
                users.map((user, index) => {
                  return (
                    <tr>
                      <td className="w-[30px] pl-4 py-3">{index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>{dayjs(user.created_at).format("DD MMMM YYYY")}</td>
                      <td className="flex items-center">
                        <Link
                          to={`/cp-admin/employees/${user.id}/edit`}
                          className="py-2 px-6 text-[#007042] bg-[#D4FFEE] mt-4 rounded-lg mr-3"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={handleUserDelete}
                          className="py-2 px-3 rounded-lg text-[#DA0A0A] bg-[#FFD4D4] mt-4"
                        >
                          <TrashIcon className="w-[20px]" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
