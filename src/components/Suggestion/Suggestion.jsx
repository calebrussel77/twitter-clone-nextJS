import Cookies from "js-cookie";
import { mutate, trigger } from "swr";
import { useNotification } from "../../store/Notification";
import { axiosInstancePut } from "../../utils/axiosInstancePut";

const Suggestion = ({ userSuggestion, usersSuggestions }) => {
  const userId = Cookies?.get("id");
  const dispatchNotification = useNotification();

  const handleFollow = () => {
    const isFollow = userSuggestion?.following?.includes(userId);

    console.log({ usersSuggestions });

    if (isFollow) {
      mutate(
        "/api/users/unfollow",
        [
          ...usersSuggestions,
          {
            ...userSuggestion,
            following: userSuggestion?.following.filter((b) => b !== userId),
          },
        ],
        false
      );
      axiosInstancePut("/api/users/unfollow", { userId: userId })
        .then((response) => {
          dispatchNotification({
            type: "SUCCESS",
            msg: response.data?.msg,
          });
          trigger("/api/users/feed");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      mutate(
        "/api/users/feed",
        [
          ...usersSuggestions,
          {
            ...userSuggestion,
            following: [...userSuggestion?.following, userId],
          },
        ],
        false
      );
      axiosInstancePut("/api/users/follow", { userId: userId })
        .then((response) => {
          dispatchNotification({
            type: "SUCCESS",
            msg: response.data?.msg,
          });
          trigger("/api/users/feed");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <>
      <div className="group cursor-pointer px-4 focus:outline-none flex py-4 flex-row justify-between items-center bg-brand-700 hover:bg-secondary-200 border-t border-gray-700 border-b w-full ">
        <div className="flex flex-row space-x-4 items-start">
          <img
            src={userSuggestion?.image}
            alt={userSuggestion?.name}
            className="h-10 w-10 rounded-full border border-secondary-700 block"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="font-bold text-base">{userSuggestion?.name}</p>
            <p className="text-gray-400 text-xs">{userSuggestion?.email}</p>
          </div>
          <div>
            <button
              onClick={handleFollow}
              className={`foucus:outline-none border-secondary-700 border px-2 text-sm py-1 rounded-l-full rounded-r-full hover:bg-purple-600 group-hover:text-white ease-in-out transition duration-150
            ${
              userSuggestion?.following?.includes(userId)
                ? "bg-secondary-700 text-white"
                : "text-secondary-700"
            }`}
            >
              {userSuggestion?.following?.includes(userId)
                ? "Abonné"
                : "Suivre"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestion;
