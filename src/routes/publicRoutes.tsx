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

const { LOGIN, REGISTER, REGISTER_SUCCESSFUL, VERIFY_EMAIL } = PUBLIC_PATHS;

const PUBLIC_ROUTES = [
  { path: LOGIN, element: <Login /> },
  { path: REGISTER, element: <Register /> },
  { path: REGISTER_SUCCESSFUL, element: <RegisterSuccessful /> },
  { path: VERIFY_EMAIL, element: <VerifyEmail /> },
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
