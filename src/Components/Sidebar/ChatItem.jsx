import React, { useContext } from "react";
import { FiMessageSquare, FiStar, FiEdit3, FiTrash2 } from "react-icons/fi";
import { MyNewContext } from "../../Context/MyContext";

const ChatItem = ({ item, index, activeChat, setActiveChat, isOpen }) => {
  const { deleteChat, renameChat } = useContext(MyNewContext);

  
  const handleDelete = (e) => {
    e.stopPropagation(); 
    deleteChat(item.id);
  };

  
  const handleRename = (e) => {
    e.stopPropagation();
    const newName = prompt("Enter new chat name");
    if (newName && newName.trim()) {
      renameChat(item.id, newName);
    }
  };

  return (
    <div
      onClick={() => setActiveChat(index)}
      className={`group flex items-center justify-between p-3 rounded-xl cursor-pointer transition border
      ${
        activeChat === index
          ? "bg-white/10 border-white/20"
          : "hover:bg-white/5 border-transparent"
      }`}
    >
    
      <div className="flex items-center gap-2 text-zinc-300">
        <FiMessageSquare size={14} />
        {isOpen && <p className="text-sm truncate">{item.user}</p>}
      </div>

     
      {isOpen && (
        <div className="hidden group-hover:flex gap-2 text-zinc-400">

          <FiStar className="hover:text-yellow-400 cursor-pointer" size={14} />

          <FiEdit3
            onClick={handleRename}
            className="hover:text-blue-400 cursor-pointer"
            size={14}
          />

          <FiTrash2
            onClick={handleDelete}
            className="hover:text-red-500 cursor-pointer"
            size={14}
          />

        </div>
      )}
    </div>
  );
};

export default ChatItem;