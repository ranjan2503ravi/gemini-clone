import React, { useState, useContext } from "react";
import { MyNewContext } from "../../Context/MyContext";

const Sidebar = () => {
  const [Menu, setMenu] = useState(false);
  const { history } = useContext(MyNewContext); 

  const handleClick = () => {
    setMenu(prev => !prev);
  };

  return (
    <div
      className={`${Menu ? "w-[280px]" : "w-[100px]"} h-screen bg-[#353739] flex flex-col justify-between p-3 text-zinc-400 font-medium transition-all duration-300`}
    >
      <div>
        <div className="relative flex items-center justify-between">
          <i
            onClick={handleClick}
            className="ri-menu-fill text-[22px] text-zinc-200 cursor-pointer p-2.5 rounded-full hover:bg-[#1B1C1D] transition-colors duration-300"
          ></i>
        </div>

        <div className="flex items-center mt-10 mb-8 text-zinc-300 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-add-large-line ml-2"></i>
          {Menu && <p className="ml-4 text-sm">New Chat</p>}
        </div>

        {Menu && (
          <div className="text-zinc-400 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <p className="mb-3 ml-2.5 text-sm uppercase tracking-wide text-zinc-500">
              Recent
            </p>

            {history.length === 0 ? (
              <p className="ml-4 text-sm text-zinc-500">No history yet</p>
            ) : (
              history.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300"
                >
                  <i className="ri-chat-1-line ml-2"></i>
                  <p className="ml-4 text-sm truncate w-[150px]">
                    {item}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className="space-y-2 text-[16px] text-zinc-300">
        <div className="flex items-center gap-4 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-question-line ml-2"></i>
          {Menu && <p className="text-sm">Help</p>}
        </div>

        <div className="flex items-center gap-4 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-history-line ml-2"></i>
          {Menu && <p className="text-sm">Activity</p>}
        </div>

        <div className="flex items-center gap-4 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-settings-5-line ml-2"></i>
          {Menu && <p className="text-sm">Settings</p>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
