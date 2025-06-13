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
  _id?: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface ICreateFolderDto {
  name: string;
}

declare interface IUpdateFolderDto {
  name?: string;
}

// conversations
declare interface IConversation {
  _id?: string;
  conversationId: string;
  title: string;
  folderId?: string | null;
  bookmarked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface ICreateConversationDto {
  conversationId: string;
  title: string;
  folderId?: string;
  bookmarked?: boolean;
}

declare interface IUpdateConversationDto {
  title?: string;
  folderId?: string | null;
  bookmarked?: boolean;
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
  createdAt?: Date;
  updatedAt?: Date;
}

declare interface ICreatePromptDto {
  name: string;
  content: string;
  folderId?: string;
}

declare interface IUpdatePromptDto {
  name?: string;
  content?: string;
  folderId?: string | null;
}

declare interface IPromptWithFolder extends Omit<IPrompt, 'folderId'> {
  folder?: IFolder | null;
}