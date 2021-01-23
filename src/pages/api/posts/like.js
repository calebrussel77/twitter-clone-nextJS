import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import checkAuth from "../../../utils/checkAuth";

import User from "../../../../models/Users";
import Post from "../../../../models/Posts";

connectDB;

export default handler.use(checkAuth).put(async (req, resp, next) => {
  //  ADD OR REMOVE LIKES IN POSTS

  const { postId } = req.body; //postId as the typeOf String while post.likes has object id powered by mongoose
  try {
    const post = await Post.findOne({ _id: postId });

    //return new array transformed
    const likeIds = post.likes.map((id) => id.toString());

    if (likeIds.includes(req.userData?.id.toString())) {
      var index = likeIds.indexOf(req.userData?.id.toString());
      //if greater than -1 , so the element is present in the array
      if (index > -1) {
        //remove one element by starting at the index number of the post.likes.splice
        post.likes.splice(index, 1);
      }
    } else {
      await post.likes.push(req.userData?.id.toString());
    }
    await post.save();

    console.log(post);

    return resp.status(200).json(post.likes);
  } catch (error) {
    console.log(error);
    return resp.status(502).json({
      errorMsg: "Une erreur est survenue veuillez réessayer !",
    });
  }
});
