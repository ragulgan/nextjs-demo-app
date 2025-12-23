import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/stote";
import RootLayout from "./layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import SnackbarProvider from "@/components/Common/snackbar";

// Custom type for pages with layout support
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const isLogin = router.pathname === "/login";

  const page = getLayout(<Component {...pageProps} />);

  return (
    <Provider store={store}>
      <SnackbarProvider>
        {isLogin ? page : <RootLayout>{page}</RootLayout>}
      </SnackbarProvider>
    </Provider>
  );
};

export default App;
