import { useState} from 'react'
import Chatbot from 'supersimpledev'



export function ChatInput({ setChatMessages }) {
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
