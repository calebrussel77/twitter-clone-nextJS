import "../css/tailwind.css";
import Router from "next/router";
import nprogress from "nprogress";
import { SWRConfig } from "swr";
import { NotificationProvider } from "../store/Notification";
import { axiosInstanceGet } from "../utils/axiosInstanceGet";
import { AnimationProvider } from "../store/Animation";

nprogress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => {
  nprogress.start();
});
Router.events.on("routeChangeComplete", () => {
  nprogress.done();
});
Router.events.on("routeChangeError", () => {
  nprogress.done();
});
function MyApp({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => axiosInstanceGet(url).then((resp) => resp.data),
      }}
    >
      <NotificationProvider>
        <AnimationProvider>
          <Component {...pageProps} />
        </AnimationProvider>
      </NotificationProvider>
    </SWRConfig>
  );
}

export default MyApp;
