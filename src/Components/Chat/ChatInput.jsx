import React from "react";
import { FiSend, FiPaperclip, FiMic, FiMessageSquare } from "react-icons/fi";

const ChatInput = ({ input, setInput, handleSend }) => {
  return (
    <div className="sticky bottom-0 p-4 border-t border-white/10 bg-black/50 backdrop-blur-xl">

      <div className="max-w-2xl mx-auto flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-3 py-2">

        <FiMessageSquare className="text-zinc-400" size={16} />

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message AI..."
          className="flex-1 bg-transparent text-sm outline-none text-white px-2"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <FiPaperclip className="text-zinc-400 cursor-pointer hover:text-white" />
        <FiMic className="text-zinc-400 cursor-pointer hover:text-white" />

        <button
          onClick={handleSend}
          className="bg-blue-600 hover:bg-blue-500 p-2 rounded-xl"
        >
          <FiSend size={16} />
        </button>

      </div>
    </div>
  );
};

export default ChatInput;