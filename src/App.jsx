import React, { useRef, useState, useEffect } from "react";
import Navbar from "./component/Navbar";
import ChatInput from "./component/ChatInput";
import ChatMessage from "./component/ChatMessage";
import Modal from "./component/Modal";
import { useDispatch, useSelector } from "react-redux";
import { getMessage, resetMessages } from "./redux/async/groqSlice";
import DOMPurify from "dompurify";

function App() {
  const endPage = useRef(null);

  const [input, setInput] = useState("");
  const { messages, loading } = useSelector((state) => state.groq);
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setInput(DOMPurify.sanitize(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getMessage(input));
    setInput("");
  };

  const handleReset = () => {
    localStorage.setItem("messages", JSON.stringify([]));
    dispatch(resetMessages());
    setShowModal(false);
  };

  useEffect(() => {
    if (endPage.current) {
      endPage.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme]);

  return (
    <>
      <Navbar />
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onClick={handleReset} />
      )}
      <div className="m-4 md:m-32 mb-32 mt-24">
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg.bot} inputMessage={msg.user} />
        ))}
        {loading && (
          <div className="loader-container">
            <div className="loader"></div>
          </div>
        )}
        <div ref={endPage}></div>
      </div>
      <ChatInput
        onSubmit={handleSubmit}
        onClick={() => setShowModal(true)}
        inputMessage={input}
        onChange={handleChange}
      />
    </>
  );
}

export default App;
