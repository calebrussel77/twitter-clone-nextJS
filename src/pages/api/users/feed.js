import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import User from "../../../../models/Users";
import checkAuth from "../../../utils/checkAuth";

connectDB;

export default handler.use(checkAuth).get((req, resp, next) => {
  // GET THE LIST OF USERS OF SPECIFIQUE FEEDS THAT WE DON'T FOLLOW

  User.findOne({ email: req.userData.email })
    .select("-password")
    .then((user) => {
      // adding the id of the current user in the array to avoids have his data
      user.following.push(user._id);

      User.find({ _id: { $nin: following } })
        .select("_id name image")
        .then((users) => {
          resp.json(users);
        });
    });
});
