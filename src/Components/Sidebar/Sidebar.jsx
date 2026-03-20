import React, { useState, useContext } from "react";
import { MyNewContext } from "../../Context/MyContext";
import ChatItem from "./ChatItem";

import {
  FiPlus,
  FiMenu,
  FiChevronLeft,
  FiSearch,
  FiBookmark,
  FiUser,
  FiSettings,
} from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { history, activeChat, setActiveChat, clearChat } =
    useContext(MyNewContext);

  
  const filteredChats = history.filter((item) =>
    item.user.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-between px-4 py-3 border-b border-white/10">
        <FiMenu
          className="text-white cursor-pointer"
          size={22}
          onClick={() => setMobileOpen(true)}
        />
        <p className="text-white text-sm font-semibold">AI Studio</p>
        <FiUser className="text-white" size={18} />
      </div>

      
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      
      <div
        className={`
          fixed md:relative z-50 h-screen flex flex-col justify-between
          bg-gradient-to-b from-[#0a0a0a] to-[#141414]
          border-r border-white/10 transition-all duration-300

          ${isOpen ? "md:w-[280px]" : "md:w-[85px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 w-[80vw] max-w-[280px]
        `}
      >
      
        <div className="p-4">

          <div className="flex items-center justify-between mb-3">
            {isOpen && (
              <p className="text-white font-semibold text-sm">
                AI Workspace
              </p>
            )}

            <FiChevronLeft
              className="text-white cursor-pointer hover:scale-110 transition"
              onClick={() => setIsOpen(!isOpen)}
            />
          </div>

       
          <button
            onClick={clearChat}
            className="w-full flex items-center gap-2 px-3 py-2 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-200 transition"
          >
            <FiPlus size={16} />
            {isOpen && "New Chat"}
          </button>

       
          <div className="mt-3 flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-2">
            <FiSearch size={14} className="text-zinc-400" />
            {isOpen && (
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search chats..."
                className="bg-transparent outline-none text-white text-sm w-full"
              />
            )}
          </div>

          
          {isOpen && (
            <p className="text-xs text-zinc-500 mt-4 mb-2 flex items-center gap-1">
              <FiBookmark size={12} /> PINNED
            </p>
          )}

         
          <div className="space-y-2 max-h-[55vh] overflow-y-auto">
            {filteredChats.length > 0 ? (
              filteredChats.map((item) => {
                const originalIndex = history.findIndex(
                  (h) => h.id === item.id
                );

                return (
                  <ChatItem
                    key={item.id}
                    item={item}
                    index={originalIndex} 
                    activeChat={activeChat}
                    setActiveChat={setActiveChat}
                    isOpen={isOpen}
                  />
                );
              })
            ) : (
              <p className="text-zinc-500 text-sm text-center mt-4">
                No chats found
              </p>
            )}
          </div>
        </div>

        
        <div className="p-4 border-t border-white/10">

          <div className="flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20">
              <img
                src="/img/IMG12.jpg"
                alt="profile"
                className="w-full h-full object-cover"
              />
            </div>

            {isOpen && (
              <div>
                <p className="text-sm font-medium">Ravi Developer</p>
                <p className="text-xs text-zinc-400">
                  Frontend Engineer
                </p>
              </div>
            )}
          </div>

          {isOpen && (
            <div className="mt-3 space-y-2 text-zinc-400 text-sm">
              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                <FiSettings size={14} />
                Settings
              </div>

              <div className="flex items-center gap-2 hover:text-white cursor-pointer">
                <FiUser size={14} />
                Profile
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;