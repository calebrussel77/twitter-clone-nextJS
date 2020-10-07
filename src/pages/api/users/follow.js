import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";

import User from "../../../../models/Users";

connectDB;

export default handler
  .use((req, resp, next) => {
    // ADD FOLLOWING PERSON INTO THE USER AUTHENTICATED
    User.findOneAndUpdate(
      { _id: req.body.userAuthenticated },
      { $push: { following: req.body.followId } },
      { new: true }
    )
      .then()
      .catch();
    next();
  })
  .put((req, resp, next) => {
    // ADD FOLLOWER PERSON INTO THE USER WE ARE FOLLOWING

    User.findOneAndUpdate(
      { _id: req.body.followId },
      { $push: { followers: req.body.userAuthenticated } },
      { new: true }
    )
      .then((data) => {
        return resp.json({ data, message: "the user have you like followers" });
      })
      .catch((err) => {
        return resp.json({ error: "error to get all posts ! " + err.message });
      });
  });
