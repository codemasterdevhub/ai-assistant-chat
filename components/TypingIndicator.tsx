
import React from 'react';
import RobotIcon from './icons/RobotIcon';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 justify-start">
      <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
        <RobotIcon className="w-5 h-5 text-white" />
      </div>
      <div className="max-w-md px-4 py-3 rounded-2xl bg-white text-gray-800 border border-gray-200 rounded-bl-lg">
        <div className="flex items-center justify-center space-x-1">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
