import React, { useState } from "react";
import { axiosInstancePost } from "../../../utils/axiosInstancePost";
import { getAuthenticated } from "../../../utils/authenticated";
import { useNotification } from "../../../store/Notification";
import { mutate, trigger } from "swr";

const AddPost = ({ posts }) => {
  const user = getAuthenticated();
  const dispatchNotification = useNotification();

  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };
  const hanleText = (e) => {
    setText(e.target.value);
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (previewSource || text) {
      mutate(
        "/api/posts",
        [
          ...posts,
          {
            text,
            image: previewSource ? previewSource : null,
          },
        ],
        false
      );
      axiosInstancePost("/api/posts", {
        text,
        image: previewSource,
      })
        .then((response) => {
          setIsLoading(false);

          dispatchNotification({
            type: "SUCCESS",
            msg: response.data?.msg,
          });
          setPreviewSource("");
          setText("");
          trigger("/api/posts");
        })
        .catch((err) => {
          setIsLoading(false);

          dispatchNotification({
            type: "ERROR",
            msg: err.response?.data.errorMsg,
          });
        });
    } else {
      setIsLoading(false);
      dispatchNotification({
        type: "ERROR",
        msg: "Veuillez ajouter un text ou une image !",
      });
    }
  };

  return (
    <>
      <div id="addPost" className="p-3">
        <div className="bg-primary-700 md:flex items-start flex-row space-x-3 mt-2 md:mt-20 w-full ">
          <img
            src={user?.image}
            alt={user?.name}
            className="h-12 w-12 md:h-16 md:w-16 rounded-full border border-gray-700"
          />
          <div className="flex-1 mt-6">
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="pb-3 border-b border-gray-800">
                <input
                  type="text"
                  className="bg-transparent w-full px-2 focus:outline-none"
                  name="text"
                  onChange={hanleText}
                  value={text}
                  autoComplete="off"
                  placeholder="Ajouter un tweet !"
                />
              </div>
              <div className="flex flex-row items-center justify-between mt-4">
                <div
                  className="focus:outline-none hover:bg-secondary-200 p-1 rounded-md cursor-pointer
                "
                  id="customBtn"
                  onClick={() => document.querySelector("#defaultBtn").click()}
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
                    id="defaultBtn"
                    name="postImage"
                    accept="image/png, image/jpeg, image/jpg, image/JPEG, image/JPG, image/PNG"
                    value={fileInput}
                    onChange={handleImputChange}
                    className="hidden"
                  ></input>
                </div>

                <div className="px-2">
                  <button
                    disabled={isLoading}
                    className={`px-4 py-2 font-medium leading-5 text-white transition-colors duration-150 bg-secondary-700 border border-transparent rounded-lg active:bg-purple-600 hover:shadow-md focus:outline-none focus:shadow-outline-purpleitems-center justify-center text-sm ${
                      isLoading
                        ? "opacity-50 hover:opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    type="submit"
                  >
                    {isLoading ? (
                      <span className="flex flex-row space-x-2 items-center">
                        <svg
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      <span>Tweeter</span>
                    )}
                  </button>
                </div>
              </div>
            </form>
            {previewSource && (
              <img
                src={previewSource}
                alt="image-chosen"
                className="h-40 w-1/2 my-4 rounded-lg border border-gray-700 shadow-lg object-cover object-center"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPost;
