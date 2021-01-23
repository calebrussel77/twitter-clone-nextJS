import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";
import checkAuth from "../../../utils/checkAuth";
import Post from "../../../../models/Posts";
import cloudinary from "../../../utils/cloudinary-config";
import User from "../../../../models/Users";

connectDB;

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};

export default handler
  .use(checkAuth)
  .get(async (req, resp, next) => {
    // GET THE LIST OF POSTS
    const user = await User.findOne({ _id: req.userData.id }).select(
      "-password"
    );

    user.following.push(user._id);

    Post.find({ postedBy: { $in: user.following } })
      .sort({ createdAt: "desc" })
      .then((posts) => {
        return resp.status(200).json(posts);
      })
      .catch((err) => {
        console.log(err);
        return resp.status(502).json({
          errorMsg: "Une erreur est survenue veuillez réessayer !",
        });
      });
  })
  .post(async (req, resp, next) => {
    // ADD ONE POST
    const fileStr = req.body?.image ? req.body?.image : null;
    let post = {};

    try {
      if (fileStr) {
        const imageResponse = await cloudinary?.uploader?.upload(fileStr, {
          upload_preset: "posts_setup",
        });

        post = new Post({
          text: req.body?.text ? req.body.text : null,
          image: imageResponse?.secure_url ? imageResponse?.secure_url : null,
          postedBy: req.userData.id,
        });
        await post.save();
        return resp.status(200).json({ msg: "Votre post a bien été crée !" });
      } else {
        post = new Post({
          text: req.body?.text ? req.body.text : null,
          postedBy: req.userData.id,
        });
        await post.save();
        return resp.status(200).json({ msg: "Votre post a bien été crée !" });
      }
    } catch (error) {
      console.log(error);
      return resp.status(502).json({
        errorMsg: "Une erreur est survenue veuillez réessayer !",
      });
    }
  });
