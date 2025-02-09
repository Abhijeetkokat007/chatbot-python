import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chat", { message: input });
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { sender: "bot", text: response.data.response },
        ]);
        setIsTyping(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong." },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-white to-gray-100 p-5">
      <div className="w-full max-w-lg mx-auto flex flex-col h-full bg-white shadow-xl rounded-xl border border-gray-300">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-100 to-white p-4 text-lg font-semibold text-center border-b border-gray-300 rounded-t-xl">
          🤖 AB AI Chatbot
        </div>

        {/* Chat Messages - Takes Full Height */}
        <div 
          ref={chatContainerRef} 
          className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide "
        >
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-xl shadow-md ${
                  msg.sender === "user"
                    ? "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing Animation */}
          {isTyping && (
            <div className="flex items-center gap-2">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="text-gray-500 text-sm">Bot is typing...</span>
            </div>
          )}
        </div>

        {/* Fixed Input Bar */}
        <div className="p-3 flex items-center border-t border-gray-300 bg-white sticky bottom-0">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-100 text-black p-2 rounded-l-md outline-none border border-gray-400 placeholder-gray-500"
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-gradient-to-r from-blue-400 to-blue-600 px-4 py-[11px] rounded-r-md hover:opacity-90 transition flex items-center justify-center text-white"
          >
            <SendHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
