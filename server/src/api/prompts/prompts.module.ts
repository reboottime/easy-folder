import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PromptsController } from './prompts.controller';
import { PromptsService } from './prompts.service';
import { PromptSchema, Prompt } from './prompt.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Prompt.name, schema: PromptSchema }]),
  ],
  controllers: [PromptsController],
  providers: [PromptsService],
})
export class PromptsModule {}
