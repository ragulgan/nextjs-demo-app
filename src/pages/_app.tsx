import type { ReactElement, ReactNode } from "react";
import { Provider } from "react-redux";
import store from "@/redux/stote";
import RootLayout from "./layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "@/theme";
import SnackbarProvider from "@/components/Common/snackbar";
import { safeJSONParse } from "@/utils/helper";
import { SESSION } from "@/utils/constant";

// Custom type for pages with layout support
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Helper function to check if user has a valid token
const hasToken = (): boolean => {
  if (typeof window === "undefined") return false;
  
  const adminInfo = localStorage.getItem(SESSION.ADMIN_TOKEN);
  const userInfo = localStorage.getItem("userInfo");
  
  const adminData = safeJSONParse(adminInfo);
  const userData = safeJSONParse(userInfo);
  
  return !!(adminData?.token || userData?.token);
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const isLogin = router.pathname === "/login";

  useEffect(() => {
    const checkAuth = () => {
      const hasValidToken = hasToken();
      setIsAuthenticated(hasValidToken);
      
      if (hasValidToken && isLogin) {
        // If user has token and is on login page, redirect to dashboard
        router.push("/dashboard");
      } else if (!hasValidToken && !isLogin) {
        // If user doesn't have token and is not on login page, redirect to login
        router.push("/login");
      }
    };

    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  // Show nothing while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  const page = getLayout(<Component {...pageProps} />);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          {isLogin ? page : <RootLayout>{page}</RootLayout>}
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
