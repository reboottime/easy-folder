import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Folder } from './folder.schema';
import { CreateFolderDto } from './dto/create-folder.dto';
import { UpdateFolderDto } from './dto/update-folder.dto';

@Injectable()
export class FoldersService {
  constructor(@InjectModel(Folder.name) private folderModel: Model<Folder>) {}

  async create(createFolderDto: CreateFolderDto): Promise<Folder> {
    // Check if folder name already exists
    const existingFolder = await this.folderModel
      .findOne({ name: createFolderDto.name })
      .exec();

    if (existingFolder) {
      throw new BadRequestException('Folder with this name already exists');
    }

    const createdFolder = new this.folderModel({
      ...createFolderDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return createdFolder.save();
  }

  async findAll(): Promise<Folder[]> {
    return await this.folderModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Folder> {
    const folder = await this.folderModel.findById(id).exec();

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    return folder;
  }

  async update(id: string, updateFolderDto: UpdateFolderDto): Promise<Folder> {
    // Check if new name conflicts with existing folders
    if (updateFolderDto.name) {
      const existingFolder = await this.folderModel
        .findOne({
          name: updateFolderDto.name,
          _id: { $ne: id },
        })
        .exec();

      if (existingFolder) {
        throw new BadRequestException('Folder with this name already exists');
      }
    }

    const updatedFolder = await this.folderModel
      .findByIdAndUpdate(
        id,
        {
          ...updateFolderDto,
          updatedAt: new Date(),
        },
        { new: true },
      )
      .exec();

    if (!updatedFolder) {
      throw new NotFoundException('Folder not found');
    }

    return updatedFolder;
  }

  async remove(id: string): Promise<void> {
    const folder = await this.folderModel.findById(id).exec();

    if (!folder) {
      throw new NotFoundException('Folder not found');
    }

    // Delete the folder only. I'd like to keep conversations intact.
    await this.folderModel.findByIdAndDelete(id).exec();
  }
}
