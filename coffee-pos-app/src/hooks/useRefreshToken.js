import ApiClient from "lib/Api/Client";
import authAPI from "modules/Auth/infrastructure/api";
import { useDispatch } from "react-redux";
import { setAuth } from "store/slice/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const refresh = async () => {
    const response = await authAPI.refreshToken();
    dispatch(setAuth({ accessToken: response.accessToken }));
    ApiClient.defaults.headers[
      "Authorization"
    ] = `Bearer ${response.accessToken}`;
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
