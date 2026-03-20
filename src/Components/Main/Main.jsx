import React, { useState, useContext, useEffect, useRef } from "react";
import { MyNewContext } from "../../Context/MyContext";
import ChatInput from "../Chat/ChatInput";
import ChatBubble from "../Chat/ChatBubble";
import { FiMessageSquare, FiCpu } from "react-icons/fi";

const Main = () => {
  const [input, setInput] = useState("");
  const [streamed, setStreamed] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const { history, activeChat, sendPrompt, loading, error } =
    useContext(MyNewContext);

  const bottomRef = useRef();

  const handleSend = () => {
    if (!input.trim()) return;
    sendPrompt(input);
    setInput("");
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

 
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, streamed, loading]);

  
  useEffect(() => {
    if (!loading && activeChat !== null && history[activeChat]) {
      const text = history[activeChat]?.ai || "";
      let i = 0;
      setStreamed("");

      const interval = setInterval(() => {
        setStreamed(text.slice(0, i));
        i++;
        if (i > text.length) clearInterval(interval);
      }, 8);

      return () => clearInterval(interval);
    }
  }, [history, loading, activeChat]);

  return (
    <div className="h-screen flex flex-col bg-[#0A0A0A] text-white flex-1">

      
      <div className="h-14 flex items-center px-6 border-b border-white/10">
        <FiMessageSquare className="text-blue-400" />
        <p className="text-sm text-zinc-300 ml-2">
          AI Chat Assistant
        </p>
      </div>

    
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-8">

         
          {activeChat === null && (
            <p className="text-zinc-400 text-center mt-10">
              Start a new chat or select one 🚀
            </p>
          )}

         
          {activeChat !== null && history[activeChat] && (
            <ChatBubble
              item={history[activeChat]}
              isLast={true}
              streamed={streamed}
              copyText={copyText}
              copiedId={copiedId}
            />
          )}

          
          {loading && (
            <div className="flex items-center gap-2 text-zinc-400 mt-4">
              <FiCpu className="animate-pulse text-blue-400" />
              AI is thinking...
            </div>
          )}

          
          {error && (
            <p className="text-red-500 text-sm mt-4">
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      
      <ChatInput
        input={input}
        setInput={setInput}
        handleSend={handleSend}
      />
    </div>
  );
};

export default Main;