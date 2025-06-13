import { IsString, IsBoolean, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateConversationDto {
  @ApiProperty({
    description: 'Folder ID to move conversation to',
    example: '65a3de...',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;

  @ApiProperty({
    description: 'Bookmark status',
    example: true,
    required: false
  })
  @IsOptional()
  @IsBoolean()
  bookmarked?: boolean;
}