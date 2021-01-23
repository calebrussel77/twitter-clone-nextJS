import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import checkAuth from "../../../utils/checkAuth";
import cloudinary from "../../../utils/cloudinary-config";

import User from "../../../../models/Users";
import Post from "../../../../models/Posts";

connectDB;

export default handler.use(checkAuth).put(async (req, resp, next) => {
  //  ADD COMMENT TO ONE POST
  const fileStr = req.body?.image ? req.body?.image : null;
  let comment = {};
  const postId = req?.body?.postId;

  console.log(req?.body);

  try {
    const post = await Post.findById(postId);

    if (fileStr) {
      const imageResponse = await cloudinary?.uploader?.upload(fileStr, {
        upload_preset: "posts_setup",
      });
      comment = {
        text: req.body?.text ? req.body.text : null,
        image: imageResponse?.secure_url ? imageResponse?.secure_url : null,
        postedBy: req?.userData?.id,
      };

      post.comments.push(comment);

      const newPost = await post.save();
      console.log(newPost);

      return resp.status(200).json({ msg: "Votre post a bien été crée !" });
    } else {
      comment = {
        text: req.body?.text ? req.body.text : null,
        postedBy: req?.userData?.id,
      };

      post.comments.push(comment);

      await post.save();

      const newPost = await post.save();
      console.log({ newPost });

      return resp.status(200).json({ msg: "Votre post a bien été crée !" });
    }
  } catch (error) {
    console.log(error);
    if (error) {
      return resp.status(502).json({
        errorMsg: "Une erreur est survenue veuillez réessayer !",
      });
    }
  }
});
