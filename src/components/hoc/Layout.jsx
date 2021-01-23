import React from "react";
import Suggestion from "../Suggestion/Suggestion";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import NotFound from "../UI/NotFound/NotFound";
import useSWR from "swr";

const Layout = (props) => {
  const { data: usersSuggestions, error } = useSWR(`/api/users/feed`);

  return (
    <div className="flex flex-col h-screen mdl:flex-row-reverse">
      <div className="xl:w-1/3 mdl:block mdl:w-1/6 lg:w-1/4 hidden text-white  border-l border-gray-700 bg-primary-700">
        <div className="p-4 lg:w-full xl:w-2/3">
          <div className="hidden lg:block relative mx-auto text-gray-600">
            <input
              className="bg-gray-800 h-10 px-5 pl-16 rounded-l-full rounded-r-full text-sm focus:outline-none w-full"
              type="search"
              name="search"
              placeholder="Rechercher sur Twitter Clone"
            />
            <button type="submit" className="absolute left-0 top-0 mt-3 ml-4">
              <svg
                className="text-gray-600 h-4 w-4 fill-current"
                viewBox="0 0 56.966 56.966"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          <div className="hidden lg:block py-4 w-full bg-gray-800 h-auto mt-4 rounded-lg">
            <h2 className="px-4 mb-4 font-bold text-white tracking-wide">
              Suggestions
            </h2>
            {usersSuggestions?.length ? (
              usersSuggestions.map((userSuggestion) => {
                return (
                  <div key={userSuggestion._id} className="w-full mb-4">
                    <Suggestion userSuggestion={userSuggestion} />
                  </div>
                );
              })
            ) : (
              <NotFound>Aucun utilisateurs trouvés</NotFound>
            )}
          </div>
        </div>
      </div>
      <Header />
      <main className="main__scroll mdl:w-1/3 flex-1 overflow-y-scroll md:ml-32 mdl:m-0 md:mr-3 mdl:flex-auto max-w-2xl xl:max-w-3xl">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
