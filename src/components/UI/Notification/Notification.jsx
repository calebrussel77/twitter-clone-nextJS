import React, { useState } from "react";

const Notification = (props) => {
  const [exit, setExit] = useState(false);
  const [width, setWidth] = useState(10);
  const [intervalID, setIntervalID] = useState(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setWidth((prev) => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(id);
        return prev;
      });
    }, 20);

    setIntervalID(id);
  };

  const handlePauseTimer = () => {
    clearInterval(intervalID);
  };

  const handleCloseNotification = () => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => {
      props.dispatch({
        type: "REMOVE_NOTIFICATION",
        id: props.id,
      });
    }, 400);
  };

  React.useEffect(() => {
    if (width === 100) {
      // Close notification
      handleCloseNotification();
    }
  }, [width]);

  React.useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <>
      <div
        onMouseEnter={handlePauseTimer}
        onMouseLeave={handleStartTimer}
        className={`notification-item mb-3 fixed bottom-3 sm:bottom-5 sm:right-3 mx-2 sm:mx-0 sm:max-w-sm w-full bg-white shadow-lg rounded-lg cursor-pointer ${
          exit ? "exit" : ""
        }`}
        style={{ zIndex: "10000000000" }}
      >
        <div className="rounded-lg shadow-xs overflow-hidden">
          <div
            className={`h-1 rounded-lg ${
              props.type === "SUCCESS" ? "bg-green-600 " : "bg-red-600"
            }`}
            style={{ width: `${width}%` }}
          />
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {props.type === "SUCCESS" ? (
                  <div className="inline-flex items-center bg-green-600 p-2 text-white text-sm rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                ) : (
                  <div className="inline-flex items-center bg-red-600 p-2 text-white text-sm rounded-full flex-shrink-0">
                    <svg
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      class="x w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                {props.type === "SUCCESS" ? (
                  <p className="text-sm leading-5 text-green-600 font-semibold">
                    Succès!
                  </p>
                ) : (
                  <p className="text-sm leading-5 font-semibold text-red-600">
                    Erreur!
                  </p>
                )}
                <p className="mt-1 text-sm leading-5 text-gray-500">
                  {props.msg}
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  onClick={handleCloseNotification}
                  className="inline-flex text-gray-400 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
