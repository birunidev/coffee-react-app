import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Onboarding({ targetPath }) {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.accessToken) {
      history.replace(targetPath);
    }
  }, [auth.accessToken, history]);

  return (
    <div className="flex items-center justify-center h-[100vh]">Loading...</div>
  );
}
