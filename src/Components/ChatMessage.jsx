import React from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy } from "react-icons/fi";

const ChatMessage = ({ user, ai }) => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-3"
    >
      
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white px-4 py-2 rounded-2xl max-w-[75%]">
          {user}
        </div>
      </div>

     
      <div className="flex justify-start">
        <div className="relative bg-zinc-800 text-gray-100 px-4 py-3 rounded-2xl max-w-[75%] leading-relaxed">

          
          <button
            onClick={() => copyToClipboard(ai)}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
          >
            <FiCopy size={16} />
          </button>

          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match ? match[1] : "javascript"}
                    PreTag="div"
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className="bg-zinc-700 px-1 rounded">
                    {children}
                  </code>
                );
              },
            }}
          >
            {ai}
          </ReactMarkdown>

        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;