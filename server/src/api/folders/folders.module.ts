import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FoldersController } from './folders.controller';
import { Folder, FolderSchema } from './folder.schema';
import { FoldersService } from './folders.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Folder.name, schema: FolderSchema }]),
  ],
  controllers: [FoldersController],
  providers: [FoldersService],
})
export class FoldersModule {}
