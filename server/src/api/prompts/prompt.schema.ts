// src/api/schemas/prompt.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PromptDocument = Prompt & Document;

@Schema({
  timestamps: true, // Automatically adds createdAt and updatedAt
  collection: 'prompts',
})
export class Prompt {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
  })
  name: string;

  @Prop({
    required: true,
    maxlength: 5000, // Reasonable limit for prompt content
  })
  content: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Folder',
    default: null,
  })
  folderId?: Types.ObjectId; // Optional folder reference

  // timestamps: true automatically adds these fields
  createdAt?: Date;
  updatedAt?: Date;
}

export const PromptSchema = SchemaFactory.createForClass(Prompt);

// Add indexes for performance
PromptSchema.index({ name: 1 });
PromptSchema.index({ folderId: 1 });
PromptSchema.index({ createdAt: -1 });
PromptSchema.index({ name: 'text', content: 'text' }); // For text search
