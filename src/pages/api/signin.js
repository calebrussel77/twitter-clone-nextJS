import connectDB from "../../utils/connectDb";
import handler from "../../utils/handler";
import User from "../../../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import cookie from "cookie";

connectDB;

export default handler
  .use(
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Votre addresse email doit être valide "),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Votre mot de passe doit contenir au moins 06 caractères")
  )
  .post((req, resp) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return resp.status(422).json({
        errorMsg: firstError,
      });
    } else {
      User.findOne({ email })
        .then((user) => {
          if (!user) {
            return resp
              .status(400)
              .json({ errorMsg: "identifiants incorrect !" });
          } else {
            bcrypt
              .compare(password, user.password)
              .then((match) => {
                if (!match) {
                  return resp
                    .status(400)
                    .json({ errorMsg: "email et/ou mot de pass incorrectes" });
                }
                const payload = {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  image: user.image,
                  about: user.about,
                };

                jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  {
                    expiresIn: 3600 * 12 * 12,
                  },
                  (err, token) => {
                    if (err) throw err;

                    resp.setHeader(
                      "Set-Cookie",
                      cookie.serialize("token", token, {
                        httpOnly: false,
                        secure: process.env.NODE_ENV !== "development",
                        sameSite: "strict",
                        path: "/",
                        maxAge: 3600 * 12 * 12,
                      })
                    );
                    return resp.status(200).json({
                      msg: `Bienvenu ${user.name} ! `,
                      token: token,
                      user: {
                        image: user.image,
                        name: user.name,
                        email: user.email,
                        id: user._id,
                        about: user.about,
                      },
                    });
                  }
                );
              })
              .catch((err) => {
                return resp.status(500).json({ errorMsg: err.message });
              });
          }
        })
        .catch((err) => {
          return resp.status(500).json({ errorMsg: err.message });
        });
    }
  });
