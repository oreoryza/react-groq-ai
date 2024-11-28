import React from "react";
import { useSelector } from "react-redux";
import { TypeAnimation } from "react-type-animation";
import { FaReact, FaCss3Alt } from "react-icons/fa";
import { SiRedux } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";

const ChatInput = ({ onSubmit, inputMessage, onChange, onClick }) => {
  const isEmpty = useSelector((state) => state.groq.isEmpty);
  return (
    <div className={`${isEmpty ? "static" : "fixed bottom-0"} w-full`}>
      <div
        className={`py-4 ${
          isEmpty ? "md:px-64" : "md:px-32"
        } px-4 text-center bg-white input-container`}
      >
        {isEmpty && (
          <div className="flex justify-center items-center h-48 w-full">
            <h1 className="text-2xl md:text-4xl font-semibold max-w-2xl">
              <TypeAnimation
                sequence={[
                  "Welcome, this is a Large Language Model AI with Llama.",
                  2000,
                  "What can I help you with?",
                  1000,
                ]}
                speed={65}
              />
            </h1>
          </div>
        )}
        <div className="flex justify-center items-center gap-2">
          {!isEmpty && (
            <button
              title="New Chat"
              onClick={onClick}
              className="bg-white border-2 p-4 group rounded-lg btn-cstm"
            >
              <i className="bi bi-chat-square-dots-fill text-xl"></i>
            </button>
          )}
          <form
            onSubmit={onSubmit}
            className="flex w-full bg-white border-2 gap-2 p-2 rounded-lg input-cstm"
          >
            <input
              className="w-full bg-transparent rounded-lg p-2 focus:outline-0"
              type="text"
              placeholder="Type your message here"
              onChange={onChange}
              value={inputMessage}
            />
            <button
              title="Send"
              type="submit"
              className="py-2 px-4 hover:rotate-45 transition duration-200"
            >
              <i className="bi bi-send-fill text-xl"></i>
            </button>
          </form>
        </div>
        <p className="mt-4 opacity-50">
          Powered by{" "}
          <a
            href="https://groq.com/"
            className="hover:underline underline-offset-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Groq
          </a>
        </p>
        {isEmpty && (
          <>
            <p className="mt-4 opacity-50">Tools:</p>
            <div className="flex justify-center items-center gap-2 mt-4">
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaReact className="text-xl opacity-50 hover:opacity-100 hover:text-[#08DDFF]" />
              </a>
              <a
                href="https://redux-toolkit.js.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiRedux className="text-xl opacity-50 hover:opacity-100 hover:text-[#7A50BE]" />
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <RiTailwindCssFill className="text-xl opacity-50 hover:opacity-100 hover:text-[#38BDF8]" />
              </a>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaCss3Alt className="text-xl opacity-50 hover:opacity-100 hover:text-blue-500" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatInput;
