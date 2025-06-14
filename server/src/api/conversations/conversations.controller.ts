import {
  Controller,
  Get,
  Put,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './conversation.schema';
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('api/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  async create(
    @Body() createConDto: CreateConversationDto,
  ): Promise<Conversation> {
    return this.conversationsService.create(createConDto);
  }

  @Get()
  async findAll(
    @Query('folderId') folderId?: string,
    @Query('bookmarked') bookmarked?: string,
  ): Promise<Conversation[]> {
    return this.conversationsService.findConversations({
      folderId,
      bookmarked: bookmarked === 'true' ? true : undefined,
    });
  }

  @Put(':conversationId')
  async update(
    @Param('conversationId') conversationId: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<Conversation> {
    return this.conversationsService.update(
      conversationId,
      updateConversationDto,
    );
  }

  @Delete(':conversationId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('conversationId') conversationId: string): Promise<void> {
    await this.conversationsService.remove(conversationId);
  }
}
