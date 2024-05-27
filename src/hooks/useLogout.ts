import { useDispatch } from "react-redux";
import { clearAuth } from "../redux/slices/authSlice";
import { removeItem } from "utils/storage";
import { useNavigate } from "react-router-dom";
import { PUBLIC_PATHS } from "routes/pagePath";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    // Clear user information from Redux
    dispatch(clearAuth());

    // Remove token and user information from local storage
    await removeItem("token");
    await removeItem("currentUser");

    // Navigate to login or home page
    navigate(PUBLIC_PATHS.LOGIN);
  };

  return logout;
};

export default useLogout;
