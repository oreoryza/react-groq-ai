import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { TypeAnimation } from "react-type-animation";

const ChatMessage = ({ message, inputMessage }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, message.length);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="flex flex-col">
      <div className="mb-6 ml-8 flex justify-end items-center">
        <p className="p-2 border-2 rounded-lg">{inputMessage}</p>
        <i className="bi bi-arrow-90deg-left text-xl ml-2"></i>
      </div>
      <div className="mb-6 mr-8 flex">
        <div className="mr-2">
          <i className="bi bi-record-circle text-xl"></i>
        </div>
        <div className="markdown">
          {isAnimating ? (
            <TypeAnimation
              sequence={[message, 2000]} // Tampilkan pesan dengan animasi
              speed={90} // Kecepatan pengetikan
              repeat={0} // Tidak mengulang
              style={{ display: "inline" }} // Pastikan tipe animasi inline
              onComplete={() => setIsAnimating(false)} // Set animasi selesai
            />
          ) : (
            <Markdown className={"leading-loose"}>{message}</Markdown> // Render markdown setelah animasi
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
