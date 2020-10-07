import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";

import User from "../../../../models/Users";
import Post from "../../../../models/Posts";

connectDB;

export default handler.put(async (req, resp, next) => {
  // ADD OR REMOVE COMMENTS IN POSTS

  const { postId, email, comment } = req.body;

  const authUser = await User.findOne({ email: email });

  const post = await Post.findOne({ _id: postId });
  const likeIds = post.likes.map((id) => id.toString());

  if (likeIds.includes(authUser._id.toString())) {
    var index = likeIds.indexOf(authUser._id.toString());
    if (index > -1) {
      post.likes.splice(index, 1);
    }
  } else {
    await post.likes.push(authUser._id.toString());
  }
  await post.save();

  resp.json({ post });
});
