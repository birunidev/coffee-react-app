import { RestrictedRoute } from "components";
import { HomePage, Login, Onboarding } from "modules/Auth/screens";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { RouteName } from "./RouteName";

export default function AuthRoutes() {
  return (
    <Switch>
      <Route exact path={RouteName.HOMEPAGE} component={HomePage} />
      <RestrictedRoute
        exact
        path={RouteName.ONBOARDING}
        component={Onboarding}
      />
      <RestrictedRoute exact path={RouteName.LOGIN} component={Login} />
    </Switch>
  );
}
