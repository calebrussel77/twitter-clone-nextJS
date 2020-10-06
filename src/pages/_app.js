import "../css/tailwind.css";
import { Provider } from "next-auth/client";
import Router from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
