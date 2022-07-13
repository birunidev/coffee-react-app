import { debounce } from "debounce";
import useRefreshToken from "hooks/useRefreshToken";
import { Onboarding } from "modules/Auth/screens";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Route } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  path,
  exact,
  ...resfOfprops
}) {
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.accessToken) {
      history.replace(RouteName.DASHBOARD);
    }

    setLoading(false);
  }, [auth, history]);

  return (
    <Route
      path={path}
      exact={exact}
      {...resfOfprops}
      render={(props) =>
        loading ? <Onboarding /> : !auth.accessToken && <Component {...props} />
      }
    />
  );
}
