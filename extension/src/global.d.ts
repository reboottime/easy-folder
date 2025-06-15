declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.json' {
  const content: string;
  export default content;
}


// folders
declare interface IFolder {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  icon?: string;
  color?: string;
}

declare interface ICreateFolderDto {
  name: string;
  description?: string;
}

declare interface IUpdateFolderDto {
  name?: string;
  description?: string;
}

// conversations
declare interface IConversation {
  _id?: string;
  conversationId: string;
  title: string;
  folderId?: string | null;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

declare interface ICreateConversationDto {
  conversationId: string;
  title: string;
  folderId: string | null;
  note?: string;
}

declare interface IUpdateConversationDto {
  title?: string;
  folderId?: string | null;
  note?: string;
}

declare interface IConversationWithFolder extends Omit<IConversation, 'folderId'> {
  folder?: IFolder | null;
}

// prompts
declare interface IPrompt {
  _id?: string;
  name: string;
  content: string;
  folderId?: string | null;
  createdAt: string;
  updatedAt: string;
}

declare interface ICreatePromptDto {
  name: string;
  content: string;
  folderId: string | null;
}

declare interface IUpdatePromptDto {
  name?: string;
  content?: string;
  folderId: string | null;
}

declare interface IPromptWithFolder extends Omit<IPrompt, 'folderId'> {
  folder?: IFolder | null;
}