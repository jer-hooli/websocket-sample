"use client";

import { useState } from "react";
import {
  StompSessionProvider,
  useSubscription,
  useStompClient,
} from "react-stomp-hooks";

type Message = {
  sender: string;
  content: string;
};

export default function Chat() {
  return (
    <StompSessionProvider url="ws://localhost:8080/chat">
      <ChatUI />
    </StompSessionProvider>
  );
}

function ChatUI() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const stompClient = useStompClient();

  // Subscribe to messages
  useSubscription("/topic/messages", (message) => {
    setMessages((prevMessages) => [...prevMessages, JSON.parse(message.body)]);
  });

  // Send a message
  const sendMessage = () => {
    if (input.trim() && stompClient) {
      stompClient.publish({
        destination: "/app/message",
        body: JSON.stringify({ content: input, sender: "User" }),
      });
      setInput("");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 flex flex-col border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 p-4 h-96 overflow-y-scroll bg-gray-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="mb-2 p-2 bg-blue-100 rounded-lg shadow-sm"
          >
            <strong className="block">{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>

      <div className="flex items-center p-4 bg-white border-t border-gray-300">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-lg mr-4 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
}
