import { AppDispatch, RootState } from "redux/store";
import { loadCurrentUser } from "../redux/slices/authSlice";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Pages = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(loadCurrentUser());
  }, [dispatch]);
  if (isAuthenticated) {
    return <Authenticated />;
  }

  return <UnAuthenticated />;
};

export default Pages;
