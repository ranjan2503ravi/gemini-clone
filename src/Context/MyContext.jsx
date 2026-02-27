import React, { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import main from "../Config/gemini";

export const MyNewContext = createContext();

const MyContext = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("chatHistory");
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(history));
  }, [history]);

  const sendPrompt = async (prompt) => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    const id = uuidv4();
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    try {
      const res = await main(prompt);

      const newChat = { id, user: prompt, ai: res, time };

      setHistory((prev) => {
        const updated = [...prev, newChat];
        setActiveChat(updated.length - 1);
        return updated;
      });
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setHistory([]);
    setActiveChat(null);
    localStorage.removeItem("chatHistory");
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