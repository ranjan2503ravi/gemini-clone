import React, { useState, useContext } from "react";
import { MyNewContext } from "../../Context/MyContext";
import ReactMarkdown from "react-markdown";

const prompts = [
  { text: "Suggest beautiful places to see on an upcoming road trip", icon: "ri-compass-2-line" },
  { text: "Briefly summarize this concept: Urban Planning", icon: "ri-lightbulb-flash-line" },
  { text: "Brainstorm team bonding activities for our work retreat", icon: "ri-mail-fill" },
  { text: "Improve the readability of the following code", icon: "ri-code-s-slash-line" },
];

const Main = () => {
  const [Input, setInput] = useState("");
  const { history, activeChat, sendPrompt, loading, error } = useContext(MyNewContext);

  const handleSend = () => {
    if (Input.trim() !== "") {
      sendPrompt(Input);
      setInput("");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col flex-1 items-center justify-center px-4 py-8">
      
      {history.length === 0 && !loading && (
        <>
          <img src="/img/download.png" alt="" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full sm:w-4/5 mb-8">
            {prompts.map((item, index) => (
              <div
                key={index}
                className="bg-zinc-700 hover:bg-zinc-800 p-5 rounded-xl flex flex-col justify-between cursor-pointer transition-transform hover:scale-105 shadow-md hover:shadow-lg"
                onClick={() => sendPrompt(item.text)}
              >
                <p className="text-sm sm:text-base">{item.text}</p>
                <i className={`${item.icon} self-end text-3xl mt-4 text-blue-400`}></i>
              </div>
            ))}
          </div>
        </>
      )}

     
      <div className="w-full max-w-2xl flex flex-col gap-4 mb-6 overflow-y-auto max-h-[60vh]">
        {history.map((item, index) => (
          <div key={index} className="space-y-3">
           
            <div className="bg-zinc-700 p-3 rounded-lg self-end text-right ml-auto w-fit max-w-[80%]">
              {item.user}
            </div>

            
            <div className="bg-zinc-800 p-3 rounded-lg self-start mr-auto w-fit max-w-[80%] relative">
              <ReactMarkdown>{item.ai}</ReactMarkdown>
              <button
                onClick={() => copyToClipboard(item.ai)}
                className="absolute top-2 right-2 text-xs text-blue-400 hover:underline"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-blue-400 mb-4">Thinking...</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      
      <div className="w-full max-w-2xl bg-[#1B1C1D] rounded-xl shadow-[0_0_20px_5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_8px_rgba(255,255,255,0.2)] transition-all duration-300 p-4 flex items-center gap-4">
        <input
          value={Input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Enter a prompt here..."
          className="flex-1 bg-transparent outline-none border-none text-white placeholder:text-zinc-400 px-3 py-2 rounded-lg text-sm sm:text-base"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <div className="flex gap-4 text-xl sm:text-2xl cursor-pointer text-zinc-400 hover:text-white">
          <i className="ri-gallery-view-2"></i>
          <i className="ri-mic-ai-fill"></i>
          <i className="ri-mail-send-line hover:text-blue-400" onClick={handleSend}></i>
        </div>
      </div>

      <footer className="text-center mt-10 text-zinc-400 text-sm sm:text-base px-3">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-semibold">
          Gemini
        </span>
        , your personal AI assistant.
      </footer>
    </div>
  );
};

export default Main;
