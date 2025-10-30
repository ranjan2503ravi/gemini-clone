import { useState, useContext, useEffect, useRef } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MyContext } from "../../Context/Context";

const Main = () => {
  const { onSent, data, Loading } = useContext(MyContext);
  const [toggle, setToggle] = useState(false);
  const [question, setQuestion] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const index = useRef(0);

  const handleToggle = () => setToggle((prev) => !prev);

  const ask = async () => {
    if (!question.trim()) return alert("Please enter a question!");
    await onSent(question);
    setQuestion("");
  };

  // ✅ Typing animation effect
  useEffect(() => {
    if (!data) return;
    setDisplayedText("");
    index.current = 0;

    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + data.charAt(index.current));
      index.current += 1;
      if (index.current >= data.length) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="w-full min-h-screen bg-[#1B1C1D] flex flex-col text-white overflow-hidden">
      {/* ---------- Header ---------- */}
      <header className="flex flex-wrap justify-between items-center p-4 border-b border-zinc-700 gap-3">
        {/* Left side */}
        <div className="relative">
          <p className="text-2xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Gemini
          </p>
          <button
            onClick={handleToggle}
            className="mt-1 inline-flex items-center gap-1 text-green-400 bg-zinc-700 px-3 py-1 rounded-md hover:bg-zinc-600 transition"
          >
            2.5 Flash
            <i className="ri-arrow-down-s-fill"></i>
          </button>

          {/* Model dropdown */}
          {toggle && (
            <div className="absolute mt-2 w-72 sm:w-80 bg-[#2a2b2d] rounded-lg p-3 shadow-lg border border-zinc-600 z-50">
              <p className="text-zinc-400 mb-2 font-semibold">
                Choose your model
              </p>

              <div className="flex justify-between items-center p-2 hover:bg-[#3b3d3f] rounded-md">
                <div>
                  <p className="text-sm text-zinc-300">Fast all-round help</p>
                  <p className="text-xs text-zinc-400">2.5 Flash</p>
                </div>
                <button className="p-2 bg-[#252627] rounded-md hover:bg-[#333537] transition">
                  <i className="ri-check-double-line"></i>
                </button>
              </div>

              <div className="mt-3">
                <p className="text-sm text-zinc-300 mb-1">
                  Reasoning, maths, and code
                </p>
                <p className="text-sm text-zinc-300">2.5 Pro</p>
              </div>

              <div className="mt-3 p-2 bg-[#252627] rounded-md flex justify-between items-center">
                <p className="text-sm text-zinc-300 w-3/4">
                  Upgrade to Google AI Pro for the most capable models
                </p>
                <button className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 transition text-sm">
                  Upgrade
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
          <button className="bg-[#0D1B2A] text-blue-400 px-3 sm:px-4 py-2 rounded-lg font-medium border border-blue-500 hover:bg-blue-600 hover:text-white transition text-sm sm:text-base">
            Upgrade
          </button>

          <SignedOut>
            <SignInButton className="bg-[#0D1B2A] text-blue-400 px-3 py-2 rounded-lg border border-blue-500 hover:bg-blue-600 hover:text-white transition text-sm sm:text-base" />
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* ---------- Main Content ---------- */}
      <main className="flex flex-col flex-1 items-center justify-center px-4 sm:px-8 overflow-y-auto custom-scroll py-6">
        {Loading && (
          <div className="text-lg text-zinc-400 mb-6 animate-pulse">
            Generating response...
          </div>
        )}

        {data ? (
          <div className="w-full sm:w-4/5 md:w-3/5 h-[60vh] sm:h-[70vh] overflow-y-auto p-4 sm:p-6 mt-4 bg-[#2a2b2d] rounded-2xl shadow-md break-words whitespace-pre-wrap custom-scroll transition-all duration-300">
            <p className="text-zinc-200 text-sm sm:text-base leading-relaxed tracking-wide whitespace-pre-wrap">
              {displayedText}
              <span className="animate-pulse text-zinc-500">|</span>
            </p>
          </div>
        ) : (
          <>
            <div className="text-2xl sm:text-3xl mb-10 font-semibold text-center">
              <p className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Hello, Dev.
              </p>
              <p className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
                How can I help you today?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full sm:w-4/5">
              {[
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
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-zinc-700 hover:bg-zinc-800 p-4 rounded-md flex flex-col justify-between cursor-pointer transition-transform hover:scale-105 text-sm sm:text-base"
                >
                  <p>{item.text}</p>
                  <i className={`${item.icon} self-end text-2xl mt-2`}></i>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* ---------- Input Section ---------- */}
      <div className="w-[90%] sm:w-[70%] md:w-[50%] bg-[#1B1C1D] rounded-lg shadow-[0_0_15px_3px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_6px_rgba(255,255,255,0.4)] transition-all duration-300 mx-auto my-6 p-3 flex items-center justify-between">
        <input
          onChange={(e) => setQuestion(e.target.value)}
          value={question}
          type="text"
          placeholder="Enter a prompt here..."
          className="flex-1 bg-transparent outline-none border-none text-white placeholder:text-zinc-400 px-2 text-sm sm:text-base"
        />
        <div className="flex gap-3 text-lg sm:text-xl cursor-pointer">
          <i className="ri-gallery-view-2"></i>
          <i className="ri-mic-ai-fill"></i>
          <i onClick={ask} className="ri-mail-send-line hover:text-blue-400"></i>
        </div>
      </div>

      {/* ---------- Footer ---------- */}
      <footer className="text-center mb-4 text-zinc-400 text-sm sm:text-lg px-3">
        Welcome to{" "}
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Gemini
        </span>
        , your personal AI assistant.
      </footer>
    </div>
  );
};

export default Main;
