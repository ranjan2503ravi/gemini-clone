import React, { createContext, useState } from "react";
import main from "../Config/gemini";

export const MyNewContext = createContext();

const MyContext = ({ children }) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  const sendPrompt = async (prompt) => {
    setLoading(true);
    setError(null);

   
    setHistory(prev => [...prev, prompt]);

    try {
      const res = await main(prompt);
      setResponse(res);
    } catch (err) {
      console.error("Gemini Error:", err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyNewContext.Provider value={{ response, sendPrompt, loading, error, history }}>
      {children}
    </MyNewContext.Provider>
  );
};

export default MyContext;
