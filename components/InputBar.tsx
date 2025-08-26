
import React, { useState } from 'react';
import SendIcon from './icons/SendIcon';

interface InputBarProps {
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 bg-white border border-gray-200 rounded-xl shadow-sm">
      <textarea
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
          }
        }}
        placeholder="Paste the message you received here..."
        className="flex-1 p-2 bg-transparent resize-none border-none focus:ring-0 outline-none text-sm placeholder-gray-400 disabled:bg-gray-100"
        rows={1}
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500 text-white transition-colors duration-200 hover:bg-indigo-600 disabled:bg-indigo-300 disabled:cursor-not-allowed"
      >
        <SendIcon className="w-5 h-5" />
      </button>
    </form>
  );
};

export default InputBar;
