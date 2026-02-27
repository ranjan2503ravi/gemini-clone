import React, { useState, useContext, useRef, useEffect } from "react";
import { MyNewContext } from "../../Context/MyContext";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const Main = () => {
  const [input, setInput] = useState("");
  const [streamedText, setStreamedText] = useState("");
  const { history, sendPrompt, loading, error } =
    useContext(MyNewContext);

  const bottomRef = useRef();

  const handleSend = () => {
    if (input.trim()) {
      sendPrompt(input);
      setInput("");
    }
  };

  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, streamedText, loading]);

  
  useEffect(() => {
    if (!loading && history.length > 0) {
      const lastMessage = history[history.length - 1].ai;
      let index = 0;

      setStreamedText("");

      const interval = setInterval(() => {
        setStreamedText(lastMessage.slice(0, index));
        index++;

        if (index > lastMessage.length) {
          clearInterval(interval);
        }
      }, 15); 

      return () => clearInterval(interval);
    }
  }, [history, loading]);

  return (
    <div className="flex-1 h-full flex flex-col overflow-hidden bg-[#121212] text-white pt-20">

      <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col items-center">

        <div className="w-full max-w-3xl space-y-6">

          {history.map((item, index) => {
            const isLast = index === history.length - 1;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                
                <div className="bg-zinc-700 p-3 rounded-lg ml-auto w-fit max-w-[80%]">
                  {item.user}
                </div>

               
                <div className="bg-zinc-800 p-3 rounded-lg w-fit max-w-[80%]">
                  <ReactMarkdown>
                    {isLast ? streamedText : item.ai}
                  </ReactMarkdown>
                </div>
              </motion.div>
            );
          })}

          {loading && (
            <div className="flex gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-300"></span>
            </div>
          )}

          {error && <p className="text-red-500">{error}</p>}

          <div ref={bottomRef} />
        </div>

      </div>

      
      <div className="p-4 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto bg-[#1B1C1D] rounded-xl p-4 flex items-center gap-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Enter a prompt..."
            className="flex-1 bg-transparent outline-none text-white"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <i
            className="ri-mail-send-line text-xl cursor-pointer hover:text-blue-400"
            onClick={handleSend}
          ></i>
        </div>
      </div>

    </div>
  );
};

export default Main;