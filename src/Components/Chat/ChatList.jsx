import React from "react";
import ChatBubble from "./ChatBubble";

const ChatList = ({ history, streamed, copyText, copiedId }) => {
  return (
    <div className="space-y-6">
      {history.map((item, i) => (
        <ChatBubble
          key={item.id}
          item={item}
          isLast={i === history.length - 1}
          streamed={streamed}
          copyText={copyText}
          copiedId={copiedId}
        />
      ))}
    </div>
  );
};

export default ChatList;