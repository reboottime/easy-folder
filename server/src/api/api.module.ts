import { Module } from '@nestjs/common';

import { ConversationsModule } from './conversations/conversations.module';
import { FoldersModule } from './folders/folders.module';
import { PromptsModule } from './prompts/prompts.module';

@Module({
  imports: [ConversationsModule, FoldersModule, PromptsModule],
})
export class ApiModule {}
