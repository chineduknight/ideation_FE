import { AppDispatch, RootState } from "redux/store";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/authSlice";
import { authRequest } from "services";
import { useQueryWrapper } from "services/api/apiHelper";

const Pages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const onSuccess = ({ data }) => {
    dispatch(setUser(data));
  };

  const { isLoading } = useQueryWrapper(
    ["currentUser"],
    authRequest.ME,
    onSuccess
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Authenticated />;
  }

  return <UnAuthenticated />;
};

export default Pages;
