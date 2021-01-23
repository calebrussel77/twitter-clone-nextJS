import connectDB from "../../utils/connectDb";
import handler from "../../utils/handler";
import User from "../../../models/Users";
import checkAuth from "../../utils/checkAuth";

connectDB;

export default handler.use(checkAuth).get((req, resp) => {
  User.findOne({ _id: req.userData.id })
    .select("-password")
    .then((userData) => {
      return resp.status(200).json(userData);
    })
    .catch((err) => {
      return resp.status(502).json({
        errorMsg: "Une erreur est survenue veuillez réessayer !",
      });
    });
});
