import connectDB from "../../utils/connectDb";
import handler from "../../utils/handler";
import checkAuth from "../../utils/checkAuth";
import { getSession } from "next-auth/client";
import Post from "../../../models/Posts";
import cloudinary from "../../utils/cloudinary-config";
import User from "../../../models/Users";

connectDB;

export default handler
  .get((req, resp, next) => {
    // GET THE LIST OF POSTS

    Post.find()
      .then((posts) => {
        return resp.json({ posts });
      })
      .catch((err) => {
        return resp.json({ error: "error to get all posts ! " + err.message });
      });
  })
  .post(async (req, resp, next) => {
    // ADD ONE POST

    const fileStr = req.body?.image ? req.body?.image : null;
    let post = {};

    try {
      const email = req.body.email;
      const userAuth = await User.findOne({ email: email });
      // console.log(imageResponse);
      if (fileStr) {
        const imageResponse = await cloudinary?.uploader?.upload(fileStr, {
          upload_preset: "posts_setup",
        });

        post = new Post({
          text: req.body?.text ? req.body.text : null,
          image: imageResponse?.secure_url ? imageResponse?.secure_url : null,
          postedBy: userAuth._id,
        });
        const data = await post.save();
        return resp.json({ postCreate: data });
      } else {
        post = new Post({
          text: req.body?.text ? req.body.text : null,
          postedBy: userAuth._id,
        });
        const data = await post.save();
        return resp.json({ postCreate: data });
      }
    } catch (error) {
      console.log(error);
      return resp.json({ error2: "error when save the post !" });
    }
  });
