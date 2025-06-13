import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { FoldersService } from './folders.service';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';
import { Folder } from './folder.schema';

@Controller('api/folders')
export class FoldersController {
  constructor(private readonly foldersService: FoldersService) {}

  @Post()
  async create(@Body() createFolderDto: CreateFolderDto): Promise<Folder> {
    return this.foldersService.create(createFolderDto);
  }

  @Get()
  async findAll(): Promise<Folder[]> {
    return this.foldersService.findAll();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFolderDto: UpdateFolderDto,
  ): Promise<Folder> {
    return this.foldersService.update(id, updateFolderDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.foldersService.remove(id);
  }
}
