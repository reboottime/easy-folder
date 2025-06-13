import { IsString, IsNotEmpty, MaxLength, MinLength, IsOptional, IsMongoId } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePromptDto {
  @ApiProperty({
    description: 'Updated prompt template name',
    example: 'Advanced Code Review',
    minLength: 1,
    maxLength: 100,
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

  @ApiProperty({
    description: 'Updated prompt template content',
    example: 'Review this code for security vulnerabilities, performance issues, and best practices...',
    maxLength: 5000,
    required: false
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content?: string;

  @ApiProperty({
    description: 'Move prompt to different folder',
    example: '65a1bc...',
    required: false
  })
  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;
}