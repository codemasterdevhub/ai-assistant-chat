
export enum MessageRole {
  USER = 'user',
  AI = 'ai',
  SYSTEM = 'system',
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}
