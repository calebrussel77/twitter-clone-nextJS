import jwt from "jsonwebtoken";

export default async function (req, resp, next) {
  req.userData = null;

  jwt.verify(req.cookies?.token, process.env.JWT_SECRET, async function (
    err,
    decodedToken
  ) {
    if (!err && decodedToken) {
      req.userData = {
        id: decodedToken.id,
        name: decodedToken.name,
        email: decodedToken.email,
      };
      next();
    } else {
      resp.status(401).json({
        errorMsg: "sorry you are not authenticated Please Sign In",
      });
    }
  });
}
