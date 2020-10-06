import connectDB from "../../../../utils/connectDb";
import handler from "../../../../utils/handler";
import User from "../../../../../models/Users";

connectDB;

export default handler.get((req, resp, next) => {
  // GET THE LIST OF USERS

  User.findOne({ _id: req.query.id })
    .select("-password")
    .then((user) => {
      return resp.json({ userProfile: user });
    });
});
