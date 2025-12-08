import { useEffect, useRef } from 'react'
import { ChatMessage } from './ChatMessage'

export function ChatMessages({ chatMessages }) {
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
