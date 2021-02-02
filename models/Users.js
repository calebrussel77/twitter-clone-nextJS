import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

//User Schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email is required",
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      required: "Name is required",
    },
    image: {
      type: String,
      default:
        "https://images.vexels.com/media/users/3/129616/isolated/preview/fb517f8913bd99cd48ef00facb4a67c0-businessman-avatar-silhouette-by-vexels.png",
    },
    about: {
      type: String,
      trim: true,
      default: "Salut j'utilise Twitter-clone ",
    },
    password: {
      type: String,
    },
    /* we wrap 'following' and 'followers' in array so that when they are populated as objects, they are put in an array (to more easily iterate over them) */
    following: [{ type: ObjectId, ref: "User" }], //ceux que tu suit
    followers: [{ type: ObjectId, ref: "User" }], //ceux qui te suivent
  },
  /* gives us "createdAt" and "updatedAt" fields automatically */
  { timestamps: true }
);

userSchema.pre("findOne", function (next) {
  this.populate("following");
  this.populate("followers");
  next();
});

//important to check if the model already exist
export default mongoose.models.User || mongoose.model("User", userSchema);
