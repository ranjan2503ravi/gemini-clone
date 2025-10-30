import React, { useContext, useState, useEffect } from "react";
import { MyContext } from "../../Context/Context";

const Sidebar = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { PrevPrompt, onSent } = useContext(MyContext);

  const handleMenuToggle = () => setIsOpen((prev) => !prev);

  // ✅ Detect screen width
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [isMobile]);

  return (
    <div
      className={`${
        isOpen ? "w-[280px]" : "w-[70px]"
      } h-screen bg-[#353739] flex flex-col justify-between p-3 transition-all duration-300 ease-in-out text-zinc-400 font-medium 
      ${isMobile ? "fixed z-50 top-0 left-0 h-full" : ""}`}
    >
      {/* ---------- Top Section ---------- */}
      <div>
        {/* Menu Icon */}
        <div className="relative flex items-center justify-between">
          <i
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleMenuToggle}
            className="ri-menu-fill text-[22px] text-zinc-200 cursor-pointer p-2.5 rounded-full hover:bg-[#1B1C1D] transition-colors duration-300"
          ></i>

          {showTooltip && !isMobile && (
            <div className="absolute left-12 top-3 w-28 bg-zinc-200 text-zinc-800 text-xs py-1.5 px-2 rounded-md shadow-md">
              {isOpen ? "Collapse Menu" : "Expand Menu"}
            </div>
          )}
        </div>

        {/* New Chat Button */}
        <div className="flex items-center mt-10 mb-8 text-zinc-300 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-add-large-line ml-2"></i>
          {isOpen && <p className="ml-4 text-sm">New Chat</p>}
        </div>

        {/* Recent Section */}
        {isOpen && (
          <div className="text-zinc-400 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            <p className="mb-3 ml-2.5 text-sm uppercase tracking-wide text-zinc-500">
              Recent
            </p>
            {PrevPrompt.length > 0 ? (
              PrevPrompt.map((item, index) => (
                <div
                  key={index}
                  onClick={() => onSent(item)}
                  className="flex items-center p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300"
                >
                  <i className="ri-chat-1-line ml-2"></i>
                  <p className="ml-4 text-sm truncate w-[150px]">{item}</p>
                </div>
              ))
            ) : (
              <p className="ml-4 text-xs text-zinc-500">No recent chats</p>
            )}
          </div>
        )}
      </div>

      {/* ---------- Bottom Section ---------- */}
      <div className="space-y-2 text-[16px] text-zinc-300">
        <div className="flex items-center gap-4 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-question-line ml-2"></i>
          {isOpen && <p className="text-sm">Help</p>}
        </div>

        <div className="flex items-center gap-4 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-history-line ml-2"></i>
          {isOpen && <p className="text-sm">Activity</p>}
        </div>

        <div className="flex items-center gap-4 p-2 hover:bg-[#3e4348] rounded-2xl cursor-pointer transition-all duration-300">
          <i className="ri-settings-5-line ml-2"></i>
          {isOpen && <p className="text-sm">Settings</p>}
        </div>
      </div>

      {/* ✅ Mobile Overlay Background */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={handleMenuToggle}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
