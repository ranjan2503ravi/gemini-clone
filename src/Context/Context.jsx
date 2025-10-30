import React, { createContext, useState } from "react";
import { aiSummarize } from "../Config/gemini";

export const MyContext = createContext();

export const ProviderContext = ({ children }) => {
  const [data, setData] = useState("");
  const [Loading, setLoading] = useState(false);
  const [PrevPrompt, setPrevPrompt] = useState([]);

  const onSent = async (prompt) => {
    try {
      setLoading(true); // ✅ Start loading
      const result = await aiSummarize(prompt);
      console.log(result);
      setData(result);
      setPrevPrompt((prev) => [...prev, prompt]); // ✅ Store prompt
    } catch (error) {
      console.error("AI Error:", error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <MyContext.Provider value={{ data, onSent, Loading, PrevPrompt, setPrevPrompt }}>
      {children}
    </MyContext.Provider>
  );
};
