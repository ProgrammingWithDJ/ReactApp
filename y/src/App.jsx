import { useState } from 'react'
import './App.css'
import { ChatInput } from './components/ChatInput'
import { ChatMessage } from './components/ChatMessage'
import ChatMessages from './components/ChatMessages'

      
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
