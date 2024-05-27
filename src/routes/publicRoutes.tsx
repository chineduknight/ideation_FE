import { Navigate } from "react-router-dom";
import WithSuspense from "components/HOC/WithSuspense";
import { PUBLIC_PATHS, PROTECTED_PATHS } from "./pagePath";
import { lazy } from "react";

const Login = WithSuspense(lazy(() => import("pages/Login")));
const Register = WithSuspense(lazy(() => import("pages/Register")));
const RegisterSuccessful = WithSuspense(
  lazy(() => import("pages/RegisterSuccessful"))
);
const VerifyEmail = WithSuspense(lazy(() => import("pages/VerifyEmail")));
const ForgotPassword = WithSuspense(lazy(() => import("pages/ForgotPassword")));
const ForgotPasswordConfirm = WithSuspense(
  lazy(() => import("pages/ForgotPasswordConfirm"))
);
const ResetPassword = WithSuspense(lazy(() => import("pages/ResetPassword")));

const {
  LOGIN,
  REGISTER,
  REGISTER_SUCCESSFUL,
  VERIFY_EMAIL,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_CONFIRM,
  RESET_PASSWORD,
} = PUBLIC_PATHS;

const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: REGISTER_SUCCESSFUL, element: <RegisterSuccessful /> },
  { path: VERIFY_EMAIL, element: <VerifyEmail /> },
  { path: FORGOT_PASSWORD, element: <ForgotPassword /> },
  { path: FORGOT_PASSWORD_CONFIRM, element: <ForgotPasswordConfirm /> },
  { path: RESET_PASSWORD, element: <ResetPassword /> },
  { path: "/", element: <Login /> },
  // this enables you not to access the public routes when logged in
  ...Object.values(PROTECTED_PATHS).map((route) => {
    return {
      path: route,
      element: <Navigate to="/" />,
    };
  }),
  { path: "*", element: <div>Page not found</div> },
];

export default PUBLIC_ROUTES;
