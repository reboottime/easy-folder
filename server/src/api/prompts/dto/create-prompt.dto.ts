import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePromptDto {
  @ApiProperty({
    description: 'Prompt template name',
    example: 'Code Review',
    minLength: 1,
    maxLength: 100
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({
    description: 'Prompt template content',
    example: 'Review this code for security vulnerabilities and best practices...',
    maxLength: 5000
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content: string;

  @ApiProperty({
    description: 'Folder ID to organize prompt',
    example: '65a1bc...',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;
}