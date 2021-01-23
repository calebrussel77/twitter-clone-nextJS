import connectDB from "../../../../utils/connectDb";
import handler from "../../../../utils/handler";
import checkAuth from "../../../../utils/checkAuth";
import Post from "../../../../../models/Posts";

import User from "../../../../../models/Users";

connectDB;

export default handler.get(async (req, resp, next) => {
  // GET THE LIST OF POSTS OF THE AUTHENTICATED USER AND USERS WHO IS FOLLOW

  const userAuth = await User.findOne({ email: req.query.emailId });
  const { following, _id } = userAuth;

  following.push(_id);

  Post.find({ postedBy: { $in: following } })
    .sort({ createdAt: "desc" }) //The Most Recents Post will be displays at the top
    .then((posts) => {
      return resp.json({ posts });
    })
    .catch((err) => {
      return resp.json({ error: "error to get all posts ! " + err.message });
    });
});
