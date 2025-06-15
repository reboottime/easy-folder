import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Conversation } from './conversation.schema';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel(Conversation.name)
    private conversationModel: Model<Conversation>,
  ) {}

  async create(createConDto: CreateConversationDto): Promise<Conversation> {
    const existing = await this.conversationModel
      .findOne({ conversationId: createConDto.conversationId })
      .exec();

    if (existing) {
      throw new BadRequestException(
        'Conversation with this name already exists',
      );
    }

    const conversation = new this.conversationModel(createConDto);

    return conversation.save();
  }

  async findConversations(params?: {
    folderId?: string;
    bookmarked?: boolean;
  }): Promise<Conversation[]> {
    const query: any = {};

    if (params?.folderId) {
      query.folderId = params.folderId;
    }

    if (params?.bookmarked !== undefined) {
      query.bookmarked = params.bookmarked;
    }

    return this.conversationModel.find(query).exec();
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
        },
        { new: true, upsert: true },
      )
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
