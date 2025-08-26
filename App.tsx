
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import { Message, MessageRole } from './types';
import { generateReply } from './services/geminiService';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'system-intro',
      role: MessageRole.SYSTEM,
      content: "Hello! Paste a message you've received, and I'll help you draft a reply that's shy, polite, and genuine.",
    }
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = useCallback(async (content: string) => {
    if (isLoading || !content.trim()) return;

    setIsLoading(true);
    setError(null);

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: MessageRole.USER,
      content: content,
    };

    setMessages(prev => [...prev, userMessage]);

    try {
      const aiResponse = await generateReply(content);
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        role: MessageRole.AI,
        content: aiResponse,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (e) {
      const err = e as Error;
      setError('Failed to get a response. Please check your API key and connection.');
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: MessageRole.SYSTEM,
        content: "Sorry, something went wrong. Please try again.",
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);


  return (
    <div className="flex flex-col h-screen font-sans bg-gray-50 text-gray-800">
      <Header />
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
        />
        {error && <p className="text-center text-red-500 text-sm p-2">{error}</p>}
      </main>
    </div>
  );
};

export default App;
