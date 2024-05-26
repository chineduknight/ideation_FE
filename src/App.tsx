import { ChakraProvider } from "@chakra-ui/react";
import Pages from "pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorBoundary from "components/ErrorBoundary";
import theme from "styles/theme";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import store from "./redux/store";
const RenderDevTool = () => {
  if (process.env.NODE_ENV === "development") {
    return <ReactQueryDevtools initialIsOpen={false} />;
  }
  return null;
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ToastContainer />
          <ErrorBoundary>
            <Pages />
          </ErrorBoundary>
          <RenderDevTool />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  );
};

export default App;
