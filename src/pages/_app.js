import "../css/tailwind.css";
import { Provider } from "next-auth/client";
import Router from "next/router";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [session, loading] = useSession();

  return (
    <Provider session={pageProps.session}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    ctx.res.writeHead(302, { Location: "/" }).end();
  }
  // const response = await axiosInstance(ctx).get("/api/user");
  // console.log(response.data);
  return {
    props: {},
  };
}
