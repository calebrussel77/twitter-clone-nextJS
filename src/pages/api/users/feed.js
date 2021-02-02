import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import User from "../../../../models/Users";
import checkAuth from "../../../utils/checkAuth";

connectDB;

export default handler.use(checkAuth).get((req, resp, next) => {
  // GET THE LIST OF USERS OF SPECIFIQUE FEEDS THAT WE DON'T FOLLOW

  User.findOne({ _id: req.userData.id })
    .select("-password")
    .then((user) => {
      // adding the id of the current user in the array to avoids have his data
      user.following.push(user._id);

      User.find({ _id: { $nin: user.following } })
        .select("-password")
        .sort({ createdAt: "desc" })
        .then((users) => {
          return resp.status(200).json(users);
        })
        .catch((err) => {
          return resp
            .status(500)
            .json({ errorMsg: "Une erreur est survenue veuillez réessayer !" });
        });
    })
    .catch((err) => {
      return resp
        .status(500)
        .json({ errorMsg: "Une erreur est survenue veuillez réessayer !" });
    });
});
