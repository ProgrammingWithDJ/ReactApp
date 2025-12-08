import { useState,useEffect, useRef } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import RobotProfileImage from './assets/AI.jpg'
import UserProfileImage from './assets/BlankUser.jpg'


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
