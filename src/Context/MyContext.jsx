import React, { createContext, useState, useEffect } from "react";
import main from "../Config/gemini";

export const MyNewContext = createContext();

const MyContext = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const sendPrompt = async (prompt) => {
    setLoading(true);
    setError(null);

    try {
      const res = await main(prompt);
      const newChat = { user: prompt, ai: res };

      setHistory((prev) => [...prev, newChat]);
      setActiveChat(history.length);
    } catch (err) {
      console.error("Gemini Error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
    setActiveChat(null);
  };

  return (
    <MyNewContext.Provider
      value={{
        history,
        activeChat,
        setActiveChat,
        sendPrompt,
        loading,
        error,
        clearChat,
      }}
    >
      {children}
    </MyNewContext.Provider>
  );
};

export default MyContext;
