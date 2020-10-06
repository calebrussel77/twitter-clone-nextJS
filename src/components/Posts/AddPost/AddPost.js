import React from "react";
import { useSession } from "next-auth/client";

const AddPost = (props) => {
  const [session, loading] = useSession();

  return (
    <div className="bg-primary-700 p-3 flex items-start flex-row space-x-3 mt-2 mdl:mt-20">
      <img
        src={session?.user.image}
        alt={session?.user.name}
        className="h-16 w-16 rounded-full border border-gray-700"
      />
      <div className="flex-1 mt-6">
        <div className="pb-3 border-b border-gray-800">
          <input
            type="text"
            className="bg-transparent w-full px-2 focus:outline-none text-white"
          />
        </div>
        <div className="text-right">
          <button className="font-extrabold text-lg text-white rounded-lg p-2 inline-block mt-4 bg-secondary-700 focus:outline-none">
            Tweeter
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
