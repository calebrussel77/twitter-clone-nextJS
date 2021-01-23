import connectDB from "../../../../utils/connectDb";
import handler from "../../../../utils/handler";
import checkAuth from "../../../../utils/checkAuth";
import Post from "../../../../../models/Posts";

import User from "../../../../../models/Users";

connectDB;

export default handler.get(async (req, resp, next) => {
  // GET THE LIST OF POSTS OF THE AUTHENTICATED USER

  const userAuth = await User.findOne({ email: req.query.emailId });

  Post.find({ postedBy: userAuth._id })
    .sort({ createdAt: "desc" }) //The Most Recents Post will be displays at the top
    .then((posts) => {
      return resp.json({ posts });
    })
    .catch((err) => {
      return resp.json({ error: "error to get all posts ! " + err.message });
    });
});
//   .post(async (req, resp, next) => {
//     // ADD ONE POST

//     const fileStr = req.body?.image;
//     let post = {};

//     try {
//       const email = req.body.email;
//       const userAuth = await User.findOne({ email: email });
//       // console.log(imageResponse);

//       if (fileStr) {
//         const imageResponse = await cloudinary.uploader.upload(fileStr, {
//           upload_preset: "posts_setup",
//         });
//         post = new Post({
//           text: req.body.text,
//           image: imageResponse?.secure_url,
//           postedBy: userAuth._id,
//         });
//       } else {
//         post = new Post({
//           text: req.body.text,
//           postedBy: userAuth._id,
//         });
//       }

//       const data = await post.save();

//       return resp.json({ postCreate: data });
//     } catch (error) {
//       console.log(error);
//       return resp.json({ error2: "error when save the post !" });
//     }
//   });
