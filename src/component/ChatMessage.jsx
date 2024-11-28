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
              sequence={[message, 1000]} // show the message and wait for 1 second
              speed={90}
              repeat={0}
              style={{ display: "inline" }}
              onComplete={() => setIsAnimating(false)}
            />
          ) : (
            <Markdown className={"leading-loose"}>{message}</Markdown> // Render markdown after animation over
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
