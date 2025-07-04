import { useState, useEffect, useRef } from 'react';
import { RiRobot2Fill } from 'react-icons/ri';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chatbot({open,setOpen, darkMode}) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);
  const chatRef = useRef(null);

  const sendMessage = async (message) => {
    const userMsg = { from: 'user', text: message };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      const botReply = { from: 'bot', text: data.reply };

      setMessages((prev) => [...prev, botReply]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { from: 'bot', text: '⚠️ Error contacting assistant.' }]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Detect click outside logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
  <AnimatePresence>
    {open ? (
      <motion.div
        ref={chatRef}
        className={`w-80 max-w-xs h-[32rem] shadow-2xl rounded-xl flex flex-col border overflow-hidden ${
          darkMode ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
        }`}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Header */}
        <div className={`px-4 py-3 flex justify-between items-center text-sm font-medium ${
          darkMode ? "bg-gray-700 text-white" : "bg-blue-700 text-white"
        }`}>
          <span>📚 Library Assistant</span>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-gray-200 transition"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className={`flex-1 overflow-y-auto px-3 py-2 space-y-3 text-sm ${
          darkMode ? "bg-gray-800" : "bg-gray-50"
        }`}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl relative ${
                  msg.from === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : darkMode
                    ? 'bg-gray-700 text-white rounded-bl-none'
                    : 'bg-gray-200 text-gray-900 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
          <div ref={scrollRef}></div>
        </div>

        {/* Input */}
        <div className={`p-3 border-t flex items-center gap-2 ${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
        }`}>
          <input
            className={`flex-1 px-3 py-2 rounded-lg text-sm outline-blue-800 ${
              darkMode
                ? "bg-gray-800 text-white border border-gray-700 placeholder-gray-400"
                : "border border-gray-300"
            }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm transition"
          >
            ➤
          </button>
        </div>
      </motion.div>
    ) : (
      <motion.button
        onClick={() => setOpen(true)}
        className={`p-4 rounded-full shadow-xl flex items-center justify-center transition ${
          darkMode ? "bg-blue-800 hover:bg-blue-900 text-white" : "bg-blue-700 hover:bg-blue-800 text-white"
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <RiRobot2Fill className="text-2xl" />
      </motion.button>
    )}
  </AnimatePresence>
</div>

  );
}
