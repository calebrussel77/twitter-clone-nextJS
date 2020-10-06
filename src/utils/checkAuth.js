import { getSession } from "next-auth/client";

export default async function (req, resp, next) {
  req.userData = null;
  const session = await getSession({ req });

  if (session) {
    req.userData = {
      name: session.user.name,
      email: session.user.email,
    };
    next();
  } else {
    resp.status(401).json({
      errorMsg: "sorry you are not authenticated Please Sign In",
    });
  }
}
