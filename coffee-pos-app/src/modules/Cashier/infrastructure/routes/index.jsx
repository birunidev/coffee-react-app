import { Transaction } from "modules/Cashier/screens";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteName } from "./routeName";

const CashierRoutes = () => {
  return (
    <Switch>
      <Route exact path={RouteName.TRANSACTION} component={Transaction} />
    </Switch>
  );
};

export default CashierRoutes;
