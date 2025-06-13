import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Conversation } from './conversation.schema';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  async findByFolder(folderId: string): Promise<Conversation[]> {
    return this.conversationModel
      .find({ folderId })
      .populate('folderId', 'name')
      .sort({ lastAccessed: -1 })
      .exec();
  }

  async findBookmarked(): Promise<Conversation[]> {
    return this.conversationModel
      .find({ bookmarked: true })
      .populate('folderId', 'name')
      .sort({ lastAccessed: -1 })
      .exec();
  }

  async update(
    conversationId: string,
    updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation> {
    const updatedConversation = await this.conversationModel
      .findOneAndUpdate(
        { conversationId },
        {
          ...updateConversationDto,
          lastAccessed: new Date(),
        },
        { new: true, upsert: true },
      )
      .populate('folderId', 'name')
      .exec();

    return updatedConversation;
  }

  async remove(conversationId: string): Promise<void> {
    const result = await this.conversationModel
      .deleteOne({ conversationId })
      .exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Conversation not found');
    }
  }
}
