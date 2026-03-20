import React from "react";
import { FiCopy, FiUser, FiCpu } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const ChatBubble = ({ item, isLast, streamed, copyText, copiedId }) => {
  return (
    <div className="space-y-4">

      
      <div className="flex justify-end items-end gap-2 group">
        <FiUser className="text-blue-400 opacity-0 group-hover:opacity-100" />
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-2xl text-sm max-w-[80%]">
          {item.user}
        </div>
      </div>

      
      <div className="flex gap-2 group">
        <FiCpu className="text-zinc-400 mt-2 opacity-0 group-hover:opacity-100" />

        <div className="relative bg-white/5 border border-white/10 px-4 py-3 rounded-2xl text-sm max-w-[85%]">

          <button
            onClick={() => copyText(item.ai, item.id)}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white"
          >
            <FiCopy size={12} />
          </button>

          <ReactMarkdown
            components={{
              code({ inline, className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline ? (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={match ? match[1] : "javascript"}
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
            {isLast ? streamed : item.ai}
          </ReactMarkdown>

          {copiedId === item.id && (
            <p className="text-[10px] text-green-400 mt-1">
              Copied!
            </p>
          )}

        </div>
      </div>

    </div>
  );
};

export default ChatBubble;