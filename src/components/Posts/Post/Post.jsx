import React from "react";
import NotFound from "../../UI/NotFound/NotFound";
import Cookies from "js-cookie";
import SinglePost from "./SinglePost/SinglePost";
import Spinner from "../../UI/Spinner/Spinner";

const Post = ({ posts }) => {
  const userId = Cookies?.get("id");

  return (
    <div>
      {!posts ? (
        <Spinner />
      ) : posts?.length > 0 ? (
        <div className="w-full">
          {posts?.map((post) => {
            return <SinglePost post={post} posts={posts} key={post._id} />;
          })}
        </div>
      ) : (
        <NotFound>Vous n'avez encore créer aucun post ! suivez des amis.</NotFound>
      )}
    </div>
  );
};

export default Post;
