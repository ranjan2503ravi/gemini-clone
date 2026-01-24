import React, { useState, useContext } from "react";

import { MyNewContext } from "../../Context/MyContext";
const prompts = [
  {
    text: "Suggest beautiful places to see on an upcoming road trip",
    icon: "ri-compass-2-line",
  },
  {
    text: "Briefly summarize this concept: Urban Planning",
    icon: "ri-lightbulb-flash-line",
  },
  {
    text: "Brainstorm team bonding activities for our work retreat",
    icon: "ri-mail-fill",
  },
  {
    text: "Improve the readability of the following code",
    icon: "ri-code-s-slash-line",
  },
];

const Main = () => {
  const [Input, setInput] = useState("");
  const { response, sendPrompt, loading, error } = useContext(MyNewContext);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = () => {
    if (Input.trim() !== "") {
      sendPrompt(Input);
      setInput("");
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col flex-1 items-center justify-center px-4 py-8">
      
     {!response && (
  <>
    <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
      Gemini AI Assistant
    </h1>

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

      
      {loading && (
        <p className="text-blue-400 mb-4">Thinking...</p>
      )}

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

     {response && (
  <div className="w-full max-w-2xl bg-zinc-800 p-4 rounded-lg mb-6 text-sm sm:text-base whitespace-pre-wrap max-h-64 overflow-y-auto">
    {response}
  </div>
)}


      
      <div className="w-full max-w-2xl bg-[#1B1C1D] rounded-xl shadow-[0_0_20px_5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_8px_rgba(255,255,255,0.2)] transition-all duration-300 p-4 flex items-center gap-4">
        <input
          value={Input}
          onChange={handleChange}
          type="text"
          placeholder="Enter a prompt here..."
          className="flex-1 bg-transparent outline-none border-none text-white placeholder:text-zinc-400 px-3 py-2 rounded-lg text-sm sm:text-base"
        />
        <div className="flex gap-4 text-xl sm:text-2xl cursor-pointer text-zinc-400 hover:text-white">
          <i className="ri-gallery-view-2"></i>
          <i className="ri-mic-ai-fill"></i>
          <i
            className="ri-mail-send-line hover:text-blue-400"
            onClick={handleSend}
          ></i>
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
