import moment from "moment";

const Comment = ({ comment, post }) => {
  return (
    <>
      <div>
        <div className="px-4 pt-3 pb-4 border-b border-gray-700">
          <div className="">
            <div className="flex flex-row space-x-3 items-start">
              <img
                src={comment?.postedBy?.image}
                alt={comment?.postedBy?.image}
                className="h-12 w-12 rounded-full border border-gray-700 object-cover object-center"
              />
              <div className="w-full">
                <div className="flex flex-col items-start mb-2 ">
                  <div className="flex flex-row items-center text-white">
                    <h2 className="text-sm font-bold truncate leading-snug">
                      {comment?.postedBy?.name}
                    </h2>
                    <p className="text-xs text-gray-400">
                      <span className="mx-1">&middot;</span>
                      {comment?.postedBy?.email}
                      <span className="text-xs text-gray-400">
                        <span className="mx-1">&middot;</span>
                        {moment(comment?.createdAt)
                          .locale("fr")
                          .startOf("hour")
                          .fromNow()}
                      </span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    En réponse à{" "}
                    <span className="text-secondary-700">
                      {post?.postedBy?.email}
                    </span>
                  </p>
                </div>
                <p className="text-base text-white pb-3">{comment?.text}</p>
                {comment?.image ? (
                  <>
                    <div
                      onClick={() => setIsOpen(true)}
                      className="transform group-hover:scale-105 ease-in-out duration-150 transition cursor-pointer overflow-hidden relative border border-gray-700 h-56 w-full rounded-md z-10"
                    >
                      <div className="absolute h-full w-full">
                        <img
                          src={comment?.image}
                          alt={comment?.postedBy?.name}
                          className="h-full w-full rounded-md object-cover object-center"
                        />
                      </div>
                    </div>
                    {isOpen && (
                      <Lightbox
                        mainSrc={comment?.image}
                        onCloseRequest={() => setIsOpen(false)}
                        imageTitle={comment?.postedBy?.name}
                        imageCaption={comment?.text}
                      />
                    )}
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className="flex items-baseline justify-between flex-row pt-5 sm:w-2/3 mx-6">
            {/* Comments */}
            <div className="cursor-pointer">
              <div className="group hover:text-secondary-700  flex flex-row space-x-2 items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="group-hover:text-secondary-700 fill-current stroke-current text-gray-400 h-5 w-5"
                >
                  <path d="M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828a.85.85 0 00.12.403.744.744 0 001.034.229c.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67a.75.75 0 00-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z" />
                </svg>
              </div>
            </div>
            {/*End of Comments */}

            {/* Retweet */}
            <div className="cursor-pointer">
              <a className="group hover:text-green-500 flex flex-row space-x-2 items-center">
                <svg
                  viewBox="0 0 24 24"
                  className=" group-hover:text-green-500 fill-current stroke-current text-gray-400 h-5 w-5"
                >
                  <path d="M23.77 15.67a.749.749 0 00-1.06 0l-2.22 2.22V7.65a3.755 3.755 0 00-3.75-3.75h-5.85a.75.75 0 000 1.5h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22a.749.749 0 10-1.06 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5a.747.747 0 000-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22a.752.752 0 001.062 0 .749.749 0 000-1.06l-3.5-3.5a.747.747 0 00-1.06 0l-3.5 3.5a.749.749 0 101.06 1.06l2.22-2.22V16.7a3.755 3.755 0 003.75 3.75h5.85a.75.75 0 000-1.5z" />
                </svg>
              </a>
            </div>

            {/* Likes */}
            <div className="cursor-pointer">
              <a className="group hover:text-red-500 inline-flex space-x-1 items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="group-hover:text-red-500 fill-current stroke-current text-gray-400 h-5 w-5"
                >
                  <path d="M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z" />
                </svg>
              </a>
            </div>

            {/* Share */}
            <div className="cursor-pointer">
              <a className="group hover:text-secondary-700 flex flex-row space-x-2 items-center">
                <svg
                  viewBox="0 0 24 24"
                  className="hover:text-secondary-700 fill-current stroke-current text-gray-400 h-5 w-5"
                >
                  <path d="M18.466 14.928a3.572 3.572 0 00-2.765 1.328l-6.587-3.358c.066-.27.11-.55.11-.842 0-.287-.042-.562-.106-.83l6.575-3.32c.658.81 1.65 1.34 2.774 1.34 1.978 0 3.586-1.606 3.586-3.58a3.587 3.587 0 00-7.172 0c0 .314.054.614.13.904L8.463 9.876a3.568 3.568 0 00-2.824-1.4c-1.98 0-3.588 1.606-3.588 3.58s1.61 3.58 3.587 3.58a3.57 3.57 0 002.815-1.39l6.56 3.343c-.08.294-.135.598-.135.918a3.587 3.587 0 007.172 0c0-1.974-1.61-3.58-3.586-3.58zm0-11.34c1.15 0 2.086.932 2.086 2.078a2.086 2.086 0 01-4.172 0c0-1.146.935-2.08 2.086-2.08zM5.64 14.134c-1.15 0-2.088-.933-2.088-2.08a2.086 2.086 0 014.172 0c0 1.145-.936 2.08-2.086 2.08zm12.826 6.452c-1.15 0-2.086-.933-2.086-2.08a2.085 2.085 0 014.172 0c0 1.145-.936 2.08-2.086 2.08z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comment;
