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

export default handler.use(checkAuth).get(async (req, resp, next) => {
  const id = req.query?.id;

  console.log(id);
  // GET one single post
  try {
    const post = await Post.findOne({ _id: id });
    return resp.status(200).json(post);
  } catch (error) {
    console.log(error);
    return resp.status(502).json({
      errorMsg: "Une erreur est survenue veuillez réessayer !",
    });
  }
});
