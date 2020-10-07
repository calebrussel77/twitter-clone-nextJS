import React, { useState } from "react";
import { useSession } from "next-auth/client";
import { axiosInstance } from "../../../utils/axiosInstance";
import axios from "axios";

const AddPost = (props) => {
  const [session, loading] = useSession();
  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [text, setText] = useState("");

  const [selectedFile, setSelectedFile] = useState("");

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
    if (!previewSource && !text) return null;
    axios
      .post("/api/posts", {
        email: session?.user.email,
        text,
        image: previewSource,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response?.data);
      });
    setPreviewSource("");
    setText("");
  };

  return (
    <>
      <div id="addPost" className="p-3">
        <div className="bg-primary-700 md:flex items-start flex-row space-x-3 mt-2 md:mt-20 w-full ">
          <img
            src={session?.user.image}
            alt={session?.user.name}
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
              <div className="flex flex-row mt-4">
                <div className="w-1/2 ">
                  <div
                    className="focus:outline-none hover:bg-secondary-200 p-1 rounded-md cursor-pointer inline-block
                "
                    id="customBtn"
                    onClick={() =>
                      document.querySelector("#defaultBtn").click()
                    }
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
                  </div>
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
                <div className="w-1/3 ml-auto px-2">
                  <button
                    type="submit"
                    className="font-extrabold text-sm text-white rounded-lg p-2 inline-block bg-secondary-700 focus:outline-none"
                  >
                    Tweeter
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
