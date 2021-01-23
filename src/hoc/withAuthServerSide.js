import Axios from "axios";
// import connectDB from "../utils/connectDb";

export function withAuthServerSideProps(getServerSidePropsFunc) {
  return async (context) => {
    const user = await getUser(context);
    if (getServerSidePropsFunc) {
      return {
        props: {
          user: user || null,
          data: {
            props: {
              user: user || null,
              data: JSON.parse(
                JSON.stringify(await getServerSidePropsFunc(context, user)) ||
                  null
              ),
            },
          },
        },
      };
    }
    return {
      props: { user: user || null, data: { props: { user: user || null } } },
    };
  };
}

async function getUser(ctx) {
  const cookie = ctx.req?.headers.cookie;
  const token = cookie?.split(";")[0].replace("token=", "");
  try {
    if (!token) {
      return null;
    } else {
      const response = await Axios.get(
        `${
          process.env.BASE_URL ? process.env.BASE_URL : "http://localhost:3000"
        }/api/me`,
        {
          headers: { authorization: "Bearer " + token },
        }
      );
      if (response?.data) {
        return response.data;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
  }
}
