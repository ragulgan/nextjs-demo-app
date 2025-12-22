import type { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '@/redux/stote';
import RootLayout from './layout';
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { NextPage } from 'next'

// Custom type for pages with layout support
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <Provider store={store}>
      <RootLayout>
        {getLayout(<Component {...pageProps} />)}
      </RootLayout>
    </Provider>
  );
};

export default App;
