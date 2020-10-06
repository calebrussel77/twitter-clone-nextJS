import React from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = (props) => {
  return (
    <div className="flex flex-col h-screen mdl:flex-row-reverse">
      <div className="xl:w-1/3 mdl:block mdl:w-1/6 lg:w-1/4 hidden text-white hidden mdl:block border-l border-gray-700 bg-primary-700" />
      <Header />
      <main className="main__scroll mdl:w-1/3 flex-1 overflow-y-scroll md:ml-32 mdl:m-0 md:mr-3 mdl:flex-auto max-w-2xl xl:max-w-3xl">
        {props.children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
