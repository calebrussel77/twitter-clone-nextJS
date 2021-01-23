import mongoose from "mongoose";

delete mongoose.connection.models["Post"];

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    image: {
      type: String,
    },
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
      {
        text: {
          type: String,
        },
        image: {
          type: String,
        },
        createdAt: { type: Date, default: Date.now },
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    postedBy: { type: ObjectId, ref: "User" },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  /* don't want to create our indices every time (nice for development, but can result in a performance hit) */
  { autoIndex: false }
);

/* Kind of like a middleware function after creating our schema (since we have access to next) */
/* Must be a function declaration (not an arrow function), because we want to use 'this' to reference our schema */
// const autoPopulatePostedBy = function (next) {
//   this.populate("postedBy", "_id name image");
//   this.populate("comments.postedBy", "_id name image");
//   next();
// };

/* We're going to need to populate the 'postedBy' field virtually every time we do a findOne / find query, so we'll just do it as a pre hook here upon creating the schema */
postSchema.pre("find", function (next) {
  this.populate("postedBy", "_id name image email");
  this.populate("comments.postedBy", "_id name image");
  next();
});

postSchema.pre("findOne", function (next) {
  this.populate("postedBy", "_id name image");
  this.populate("comments.postedBy", "_id name image");
  next();
});

// /* Create index on keys for more performant querying/post sorting */
postSchema.index({ postedBy: 1, createdAt: 1 });

export default mongoose.models.Post || mongoose.model("Post", postSchema);
