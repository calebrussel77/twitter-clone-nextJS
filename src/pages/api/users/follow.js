import connectDB from "../../../utils/connectDb";
import handler from "../../../utils/handler";

import User from "../../../../models/Users";
import checkAuth from "../../../utils/checkAuth";

connectDB;

export default handler
  .use(checkAuth)
  .use(async (req, resp, next) => {
    // ADD FOLLOWING PERSON INTO THE USER AUTHENTICATED
    const userAuth = await User.findById(req.userData?.id);

    userAuth.following = [...userAuth.following, req.body?.userId];

    userAuth.save();
    next();
  })
  .put(async (req, resp, next) => {
    console.log(req.body?.userId);
    // ADD FOLLOWER PERSON INTO THE USER WE ARE FOLLOWING
    try {
      const userFollowed = await User.findById(req.body?.userId);

      userFollowed.followers = [...userFollowed.followers, req.userData?.id];

      userFollowed.save();
      return resp.json({
        msg: `Vous suivez desormais ${userFollowed?.name}`,
      });
    } catch (error) {
      console.log(error);
      return resp.status(502).json({
        errorMsg: "Une erreur est survenue veuillez réessayer !",
      });
    }
  });
