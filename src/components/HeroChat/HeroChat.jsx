import { useState, useRef, useEffect } from 'react';
import { sendMessageToPatrick } from '../../services/chatService';
import './HeroChat.css';

const SUGGESTIONS = [
  "What is your tech stack?",
  "Are you available for work?",
  "What services do you offer?"
];

// Cleans out <think> reasoning blocks and em dashes
const formatText = (text) => {
  if (!text) return '';
  return text
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/—|--/g, '')
    .trim();
};

export default function HeroChat() {
  const [messages, setMessages] = useState([
    {
      sender: 'patrick',
      text: "Hi! I'm Patrick. Ask me anything about my background, projects, or technical skills!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const updatedMessages = [...messages, { sender: 'user', text: query }];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const rawReply = await sendMessageToPatrick(query, messages);
      const cleanedReply = formatText(rawReply);
      setMessages([...updatedMessages, { sender: 'patrick', text: cleanedReply }]);
    } catch (err) {
      console.error("Chat execution error:", err);
      setMessages([
        ...updatedMessages,
        { sender: 'patrick', text: "An error occurred while fetching the response. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="hero-chat-wrapper">
      {/* Morphing Floating Chat Window */}
      <div className={`hero-chat-container ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <span className="chat-title">Chat Assistant</span>
          <button className="chat-close-btn" onClick={toggleChat} aria-label="Close chat">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-message-row ${msg.sender}`}>
              <span className={`chat-avatar-badge ${msg.sender}`}>
                {msg.sender === 'patrick' ? (
                  'P'
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                )}
              </span>
              <div className="chat-bubble">{formatText(msg.text)}</div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message-row patrick">
              <span className="chat-avatar-badge patrick">P</span>
              <div className="chat-bubble loading">
                <div className="typing-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chat-suggestions">
          {SUGGESTIONS.map((suggestion, index) => (
            <button
              key={index}
              className="chip-btn"
              onClick={() => handleSend(suggestion)}
              disabled={isLoading}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form className="chat-input-wrapper" onSubmit={(e) => { e.preventDefault(); handleSend(); }}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button type="submit" className="send-btn" disabled={isLoading || !input.trim()} aria-label="Send message">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>

      {/* Trigger FAB Button */}
      <button 
        className={`hero-chat-fab ${isOpen ? 'hidden' : ''}`} 
        onClick={toggleChat}
        aria-label="Open chat window"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </button>
    </div>
  );
}