import connectDB from "../../utils/connectDb";
import handler from "../../utils/handler";
import User from "../../../models/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

connectDB;

export default handler
  .use(
    check("name", "Votre nom d'utilisateur est requis ").notEmpty(),
    check("email")
      .isEmail()
      .withMessage("Votre addresse email doit être valide "),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Votre mot de passe doit contenir au moins 06 caractères")
  )
  .post((req, resp) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return resp.status(422).json({
        errorMsg: firstError,
      });
    } else {
      User.findOne({ email })
        .then((user) => {
          if (user) {
            return resp.status(400).json({
              msg: "Cet utilisateur existe déjà, veuillez vous connecter",
            });
          }
          user = new User({
            name,
            email,
            password,
          });

          bcrypt.hash(password, 10).then((hash) => {
            user.password = hash;
            user.save();

            const payload = {
              id: user._id,
              name: user.name,
              email: user.email,
            };

            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {
                expiresIn: 3600,
              },
              (err, token) => {
                if (err) throw err;
                return resp.status(200).json({
                  msg:
                    "Votre compte a bien été crée, connectez-vous avec vos identifiants !",
                });
              }
            );
          });
        })
        .catch((err) => {
          return resp.status(500).json({ errorMsg: err.message });
        });
    }
  });
