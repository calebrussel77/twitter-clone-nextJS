import Cookies from "js-cookie";

const Suggestion = ({ userSuggestion }) => {
  return (
    <>
      <div className="group cursor-pointer px-4 focus:outline-none flex py-4 flex-row justify-between items-center bg-brand-700 hover:bg-secondary-200 border-t border-gray-700 border-b w-full ">
        <div className="flex flex-row space-x-3 items-start">
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
              className="text-secondary-700 border-secondary-700 border px-2 text-sm py-1 rounded-l-full rounded-r-full group-hover:bg-purple-600 group-hover:text-white ease-in-out transition duration-150
            "
            >
              suivre
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Suggestion;
