import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import checkAuth from "../../../utils/checkAuth";
import User from "../../../../models/Users";

connectDB;

export default handler.use(checkAuth).get((req, resp, next) => {
  // GET THE LIST OF USERS

  User.find()
    .select("_id name email about image")
    .sort({ createdAt: "desc" })
    .then((users) => {
      return resp.status(200).json(users);
    })
    .catch((err) => {
      return resp
        .status(500)
        .json({ errorMsg: "Une erreur est survenue veuillez réessayer !" });
    });
});
