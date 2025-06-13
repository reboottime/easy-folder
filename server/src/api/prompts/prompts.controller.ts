import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { Prompt } from './prompt.schema';

@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  async create(@Body() createPromptDto: CreatePromptDto): Promise<Prompt> {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  async findAll(
  ): Promise<Prompt[]> {
    return this.promptsService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePromptDto: UpdatePromptDto,
  ): Promise<Prompt> {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.promptsService.remove(id);
  }
}