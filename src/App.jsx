import React from "react";
import MyContext from "./Context/MyContext";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";

const App = () => {
  return (
    <MyContext>
      <div className="flex h-screen overflow-hidden bg-[#121212]">
        <Sidebar />
        <Main />
      </div>
    </MyContext>
  );
};

export default App;