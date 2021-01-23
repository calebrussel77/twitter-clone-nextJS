import useSWR, { mutate, trigger } from "swr";
import { useState } from "react";
import { axiosInstancePut } from "../../utils/axiosInstancePut";
import { useNotification } from "../../store/Notification";
import { getAuthenticated } from "../../utils/authenticated";
import moment from "moment";

const AddTweetComment = ({ posts, postSelected }) => {
  const user = getAuthenticated();
  const [isLoading, setIsLoading] = useState(false);
  const [fileInput, setFileInput] = useState("");
  const [previewSource2, setPreviewSource2] = useState("");
  const dispatchNotification = useNotification();

  const handleImputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const [text, setText] = useState("");

  const hanleText = (e) => {
    setText(e.target.value);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource2(reader.result);
    };
  };
  const handleComments = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (previewSource2 || text) {
      mutate(
        "/api/posts",
        [
          ...posts,
          {
            ...postSelected,
            comments: [
              ...postSelected?.comments,
              {
                text,
                image: previewSource2,
              },
            ],
          },
        ],
        false
      );
      axiosInstancePut("/api/posts/comment", {
        text,
        image: previewSource2,
        postId: postSelected?._id,
      })
        .then((response) => {
          setIsLoading(false);
          setPreviewSource2("");
          setText("");
          dispatchNotification({
            type: "SUCCESS",
            msg: response.data?.msg,
          });
          trigger("/api/posts");
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
          dispatchNotification({
            type: "ERROR",
            msg: err.response?.data.errorMsg,
          });
        });
    } else {
      setIsLoading(false);
      return dispatchNotification({
        type: "ERROR",
        msg: "Veuillez ajouter un text ou une image !",
      });
    }
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: "100000",
      }}
    >
      <div className="bg-primary-700 px-2 sm:px-6 py-8 shadow-lg rounded-md post-width sm:mx-2">
        <div className="relative pb-12">
          <div className="flex flex-row space-x-3 items-start">
            <div className="relative z-30 overflow-hidden">
              <img
                src={postSelected?.postedBy?.image}
                alt={postSelected?.postedBy?.name}
                className="h-10 w-10 md:h-16 md:w-16 rounded-full border border-gray-700 bg-gray-300"
              />
            </div>

            <div className="w-full">
              <div className="flex flex-col items-start mb-2 ">
                <div className="flex flex-row items-center text-white">
                  <h2 className="text-sm font-bold truncate leading-snug">
                    {postSelected?.postedBy?.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    <span className="mx-1">&middot;</span>
                    {moment(postSelected?.createdAt)
                      .locale("fr")
                      .startOf("hour")
                      .fromNow()}
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  {postSelected?.postedBy?.email}
                </p>
              </div>
              <p className="text-sm text-white">{postSelected?.text}</p>
            </div>
          </div>
          <div className="absolute bottom-0 h-full border-l border-gray-600 ml-6" />
        </div>

        <div className="relative inline-flex flex-row space-x-3 w-full">
          <img
            src={user?.image}
            alt={user?.name}
            className="h-10 w-10 md:h-16 md:w-16 rounded-full border border-gray-700 bg-gray-300"
          />
          <div className="mt-6 w-full">
            <form onSubmit={handleComments} autoComplete="off">
              <div className="pb-3 border-b border-gray-800">
                <input
                  type="text"
                  className="bg-transparent w-full px-2 focus:outline-none"
                  name="text"
                  onChange={hanleText}
                  value={text}
                  autoComplete="off"
                  placeholder={`répondre au tweet de ${postSelected?.postedBy?.name} !`}
                />
              </div>
              <div className="px-2 py-3 sm:px-6 flex flex-row items-center justify-between">
                <div
                  className="focus:outline-none hover:bg-secondary-200 p-1 rounded-md cursor-pointer
                "
                  id="customBtn"
                  onClick={() => document.querySelector("#defaultBtn2").click()}
                >
                  <svg
                    className="w-8 h-8 text-secondary-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="file"
                    id="defaultBtn2"
                    name="postImage"
                    accept="image/png, image/jpeg, image/jpg, image/JPEG, image/JPG, image/PNG"
                    value={fileInput}
                    onChange={handleImputChange}
                    className="hidden"
                  ></input>
                </div>
                <span className="inline-flex rounded-md shadow-sm">
                  <button
                    disabled={isLoading}
                    className={`px-3 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-secondary-700 border border-transparent rounded-lg active:bg-purple-600 focus:outline-none focus:shadow-outline-purpleitems-center justify-center text-sm ${
                      isLoading
                        ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    type="submit"
                    //   onClick={handleSubmit}
                  >
                    {isLoading ? (
                      <span className="flex flex-row space-x-2 items-center">
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          />
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        <span className="text-white">patientez...</span>
                      </span>
                    ) : (
                      <span>Repondre</span>
                    )}
                  </button>
                </span>
              </div>
              {previewSource2 && (
                <img
                  src={previewSource2}
                  alt="image-chosen"
                  className="h-40 w-1/2 my-4 rounded-lg border border-gray-700 shadow-lg object-cover object-center"
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTweetComment;
