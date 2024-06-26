/* eslint-disable react/display-name */
import { Suspense } from "react";
import Loader from "../Loader";

const WithSuspense =
  (Component, showLoader = true) =>
  (props) => {
    return (
      <Suspense fallback={showLoader ? <Loader /> : "..."}>
        <Component {...props} />
      </Suspense>
    );
  };
export default WithSuspense;
