import React, { useState, useContext } from "react";
import { MyNewContext } from "../../Context/MyContext";
import { FiPlus, FiMenu, FiChevronLeft } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);      
  const [mobileOpen, setMobileOpen] = useState(false); 

  const { history, activeChat, setActiveChat, clearChat } =
    useContext(MyNewContext);

  return (
    <>
      
      <div className="md:hidden fixed top-0 left-0 right-0 bg-[#353739] p-4 z-50 flex justify-between items-center">
        <FiMenu
          size={24}
          className="text-white cursor-pointer"
          onClick={() => setMobileOpen(true)}
        />
        <p className="text-white font-semibold text-sm">Chats</p>
      </div>

      
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <div
        className={`
          fixed md:relative z-50 h-screen bg-[#353739] flex flex-col justify-between transition-all duration-300
          ${isOpen ? "md:w-[260px]" : "md:w-[80px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          w-[75vw] max-w-[260px] shadow-lg
        `}
      >
       
        <div className="p-4 mt-16 md:mt-0 flex flex-col">
          
          <div className="hidden md:flex justify-end mb-4">
            <FiChevronLeft
              size={24}
              className="text-white cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

          
          <div
            onClick={clearChat}
            className="flex items-center gap-3 p-3 hover:bg-[#3e4348] rounded-xl cursor-pointer transition-all duration-200 shadow-sm"
          >
            <FiPlus className="text-white" size={18} />
            {isOpen && <p className="text-white text-sm font-medium">New Chat</p>}
          </div>

          
          <div className="mt-6 space-y-2 overflow-y-auto max-h-[60vh] pr-1">
            {history.length > 0 && isOpen && (
              <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Recent</p>
            )}
            {history.map((item, index) => (
              <div
                key={item.id}
                onClick={() => {
                  setActiveChat(index);
                  setMobileOpen(false);
                }}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${activeChat === index ? "bg-blue-600/40 text-white" : "hover:bg-[#3e4348] text-zinc-300"}
                `}
              >
                <i className="ri-chat-1-line text-lg"></i>
                {isOpen && <p className="truncate text-sm font-medium">{item.user}</p>}
              </div>
            ))}
          </div>
        </div>

        
        {isOpen && (
          <div className="p-4 space-y-3 text-zinc-300">
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-all duration-200">
              <i className="ri-question-line text-lg"></i>
              <p className="text-sm">Help</p>
            </div>
            <div className="flex items-center gap-2 cursor-pointer hover:text-white transition-all duration-200">
              <i className="ri-settings-5-line text-lg"></i>
              <p className="text-sm">Settings</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;