
import React from 'react';
import { Message, MessageRole } from '../types';
import RobotIcon from './icons/RobotIcon';
import UserIcon from './icons/UserIcon';
import InfoIcon from './icons/InfoIcon';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { role, content } = message;

  const isUser = role === MessageRole.USER;
  const isAI = role === MessageRole.AI;
  const isSystem = role === MessageRole.SYSTEM;

  if (isSystem) {
    return (
      <div className="flex items-center justify-center my-2">
        <div className="flex items-center text-xs text-gray-500 bg-gray-200 rounded-full px-4 py-1">
          <InfoIcon className="w-4 h-4 mr-2" />
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
          <RobotIcon className="w-5 h-5 text-white" />
        </div>
      )}
      <div
        className={`max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl whitespace-pre-wrap ${
          isUser
            ? 'bg-indigo-500 text-white rounded-br-lg'
            : 'bg-white text-gray-800 border border-gray-200 rounded-bl-lg'
        }`}
      >
        <p className="text-sm">{content}</p>
      </div>
       {isUser && (
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
          <UserIcon className="w-5 h-5 text-gray-600" />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
