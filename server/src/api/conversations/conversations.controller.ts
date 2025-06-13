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
} from '@nestjs/common';

import { ConversationsService } from './conversations.service';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { Conversation } from './conversation.schema';

@Controller('api/conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Get()
  async findAll(
    @Query('folderId') folderId?: string,
    @Query('bookmarked') bookmarked?: string,
  ): Promise<{ conversations: Conversation[] } | Conversation[]> {
    if (bookmarked === 'true') {
      const conversations = await this.conversationsService.findBookmarked();
      return conversations;
    } else if (folderId) {
      const conversations = await this.conversationsService.findByFolder(
        folderId,
      );
      return conversations;
    } else {
      throw new Error('Invalid query parameters');
    }
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
