import { ProtectedRoute } from "components";
import {
  CreateMenu,
  Dashboard,
  Media,
  Menus,
  TransactionDetail,
  TransactionHistory,
  Employees,
  CreateEmployee,
  EditMenu,
  EditEmployee,
} from "modules/Dashboard/screens";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { RouteName } from "./RouteName";

export default function DashboardRoutes() {
  return (
    <Switch>
      <ProtectedRoute exact path={RouteName.DASHBOARD} component={Dashboard} />

      <ProtectedRoute exact path={RouteName.MENUS} component={Menus} />
      <ProtectedRoute
        exact
        path={RouteName.ADD_NEW_MENU}
        component={CreateMenu}
      />
      <ProtectedRoute exact path={RouteName.EDIT_MENU} component={EditMenu} />
      <ProtectedRoute exact path={RouteName.MEDIA} component={Media} />
      <ProtectedRoute
        exact
        path={RouteName.TRANSACTIONS}
        component={TransactionHistory}
      />
      <ProtectedRoute
        exact
        path={RouteName.TRANSACTION_DETAIL}
        component={TransactionDetail}
      />
      <ProtectedRoute exact path={RouteName.EMPLOYEES} component={Employees} />
      <ProtectedRoute
        exact
        path={RouteName.ADD_NEW_EMPLOYEE}
        component={CreateEmployee}
      />
      <ProtectedRoute
        exact
        path={RouteName.EDIT_EMPLOYEE}
        component={EditEmployee}
      />
    </Switch>
  );
}
