// src/api/schemas/conversation.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ConversationDocument = Conversation & Document;

@Schema({
  collection: 'conversations',
  timestamps: true,
})
export class Conversation {
  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  conversationId: string; // Unique ID from browser storage

  @Prop({
    required: true,
    trim: true,
    maxlength: 200,
  })
  title: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Folder',
    default: null,
  })
  folderId?: Types.ObjectId; // Optional reference to folder

  @Prop({
    required: false,
    default: null,
  })
  note: string;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);

// Add indexes for performance
ConversationSchema.index({ conversationId: 1 }, { unique: true });
ConversationSchema.index({ folderId: 1 });
ConversationSchema.index({ bookmarked: 1 });
ConversationSchema.index({ lastAccessed: -1 });
ConversationSchema.index({ title: 'text' }); // For text search
