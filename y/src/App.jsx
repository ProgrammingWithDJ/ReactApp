import { useState,useEffect, useRef } from 'react'
import './App.css'
import RobotProfileImage from './assets/AI.jpg'
import UserProfileImage from './assets/BlankUser.jpg'

    // eslint-disable-next-line no-unused-vars
  function ChatInput({ setChatMessages }) {
        const [inputText, setInputText] = useState("");
        const [isLoading, setIsLoading] = useState(false);

        function saveInputText(e) {
          setInputText(e.target.value);
        }

        async function sendMessage() {
          if (isLoading) return;
          const text = inputText.trim();
          if (!text) return;

          setIsLoading(true);

          // Add user message immediately
          const userMsg = {
            message: text,
            sender: "user",
            id: Date.now() + Math.random(),
          };
          setChatMessages((prev) => [...prev, userMsg]);
          setInputText("");

          try {
            // await async response (Chatbot.getResponseAsync provided by chatbot.js)
            const response = await Chatbot.getResponseAsync(text);
            const botMsg = {
              message: response || "Sorry, I didn't understand that.",
              sender: "robot",
              id: Date.now() + Math.random(),
            };
            setChatMessages((prev) => [...prev, botMsg]);
          } catch (err) {
            console.error("Chatbot error:", err);
            const errMsg = {
              message: "Error: Unable to get response. Please try again.",
              sender: "robot",
              id: Date.now() + Math.random(),
            };
            setChatMessages((prev) => [...prev, errMsg]);
          } finally {
            setIsLoading(false);
          }
        }

        return (
          <div className="chat-input-container">
            <input
              type="text"
              placeholder="Send a message to Chatbot.."
              value={inputText}
              onChange={saveInputText}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
                if (e.key === "Escape") setInputText("");
              }}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !inputText.trim()}
              aria-disabled={isLoading || !inputText.trim()}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        );
      }

      function ChatMessage({ message, sender }) {
        return (
          <div className={`message ${sender}`}>
            {sender === "robot" && (
              <img src={RobotProfileImage} width="50" alt="AI avatar" />
            )}
            <span>{message}</span>
            {sender === "user" && (
              <img src={UserProfileImage} width="50" alt="User avatar" />
            )}
          </div>
        );
      }

      function ChatMessages({ chatMessages }) {
        const endRef = useRef(null);

        useEffect(() => {
          endRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [chatMessages]);

        return (
          <div className="messages" role="log" aria-live="polite">
            {chatMessages.map((m) => (
              <ChatMessage
                key={m.id}
                message={m.message}
                sender={m.sender}
              />
            ))}
            <div ref={endRef} />
          </div>
        );
      }

function App() {
        const [chatMessages, setChatMessages] = useState([
          { message: "Hello ChatBot", sender: "user", id: 1 },
          { message: "How can I help you?", sender: "robot", id: 2 },
        ]);

        return (
          <div className="chat-container" aria-label="Chat application">
            <ChatMessages chatMessages={chatMessages} />
            <ChatInput setChatMessages={setChatMessages} />
          </div>
        );
      }

export default App
