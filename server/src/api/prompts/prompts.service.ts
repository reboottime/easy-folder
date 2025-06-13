import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Prompt } from './prompt.schema';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';

@Injectable()
export class PromptsService {
  constructor(
    @InjectModel(Prompt.name) private promptModel: Model<Prompt>,
  ) {}

  async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
    const createdPrompt = new this.promptModel({
      ...createPromptDto,
      createdAt: new Date(),
    });

    return createdPrompt.save();
  }

  async findAll(folderId?: string): Promise<Prompt[]> {
    const filter = folderId ? { folderId } : {};
    
    return this.promptModel
      .find(filter)
      .populate('folderId', 'name')
      .sort({ createdAt: -1 })
      .exec();
  }



  async update(id: string, updatePromptDto: UpdatePromptDto): Promise<Prompt> {
    const updatedPrompt = await this.promptModel
      .findByIdAndUpdate(id, updatePromptDto, { new: true })
      .populate('folderId', 'name')
      .exec();

    if (!updatedPrompt) {
      throw new NotFoundException('Prompt not found');
    }

    return updatedPrompt;
  }

  async remove(id: string): Promise<void> {
    const result = await this.promptModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException('Prompt not found');
    }
  }
}