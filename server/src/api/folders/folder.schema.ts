// src/api/schemas/folder.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FolderDocument = Folder & Document;

@Schema({
  timestamps: true,
  collection: 'folders'
})
export class Folder {
  @Prop({
    required: true,
    trim: true,
    maxlength: 100,
  })
  name: string;

  @Prop({
    required: false,
    trim: true,
    maxlength: 100,
  })
  descritpion: string;
}

export const FolderSchema = SchemaFactory.createForClass(Folder);

// Add indexes for performance
FolderSchema.index({ name: 1 });
FolderSchema.index({ createdAt: -1 });
