import { debounce } from "debounce";
import useRefreshToken from "hooks/useRefreshToken";
import { RouteName } from "modules/Auth/infrastructure/routes/RouteName";
import { Onboarding } from "modules/Auth/screens";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, Route } from "react-router-dom";

export default function ProtectedRoute({
  component: Component,
  path,
  exact,
  ...resfOfprops
}) {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const refresh = useRefreshToken();
  const auth = useSelector((state) => state.auth);

  const getRefreshToken = useCallback(() => {
    debounce(
      refresh()
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          history.replace(RouteName.LOGIN);
        }),
      2000
    );
  }, [history]);

  useEffect(() => {
    if (!auth.accessToken) {
      setLoading(true);
      getRefreshToken();
    }
  }, [auth, getRefreshToken]);

  return (
    <Route
      path={path}
      exact={exact}
      {...resfOfprops}
      render={(props) =>
        loading ? <Onboarding /> : auth.accessToken && <Component {...props} />
      }
    />
  );
}
