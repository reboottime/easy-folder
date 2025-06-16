import { Module } from '@nestjs/common';

import { ConversationsModule } from './conversations/conversations.module';
import { FoldersModule } from './folders/folders.module';
import { PromptsModule } from './prompts/prompts.module';
import { GithubModule } from './github/github.module';

@Module({
  imports: [ConversationsModule, FoldersModule, PromptsModule, GithubModule],
})
export class ApiModule {}
