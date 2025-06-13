import { Module } from '@nestjs/common';
import { FoldersController } from './folders/folders.controller';
import { FoldersService } from './folders/folders.service';
import { ConversationsController } from './conversations/conversations.controller';
import { ConversationsService } from './conversations/conversations.service';
import { PromptsController } from './prompts/prompts.controller';
import { PromptsService } from './prompts/prompts.service';

@Module({
  controllers: [FoldersController, ConversationsController, PromptsController],
  providers: [FoldersService, ConversationsService, PromptsService],
})
export class ApiModule {}
