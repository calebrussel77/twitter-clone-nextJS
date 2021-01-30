import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import checkAuth from "../../../utils/checkAuth";

import User from "../../../../models/Users";
import Post from "../../../../models/Posts";

connectDB;

export default handler.use(checkAuth).put(async (req, resp, next) => {
  //  ADD OR REMOVE RETWEETS IN POSTS

  const { postId } = req.body; //postId as the typeOf String while post.retweets has object id powered by mongoose
  try {
    const post = await Post.findOne({ _id: postId });

    //return new array transformed
    const retweetIds = post.retweets.map((id) => id.toString());

    if (retweetIds.includes(req.userData?.id.toString())) {
      var index = retweetIds.indexOf(req.userData?.id.toString());
      //if greater than -1 , so the element is present in the array
      if (index > -1) {
        //remove one element by starting at the index number of the post.retweets.splice
        post.retweets.splice(index, 1);
      }
    } else {
      await post.retweets.push(req.userData?.id.toString());
    }
    await post.save();

    console.log(post);

    return resp.status(200).json(post.retweets);
  } catch (error) {
    console.log(error);
    return resp.status(502).json({
      errorMsg: "Une erreur est survenue veuillez réessayer !",
    });
  }
});
