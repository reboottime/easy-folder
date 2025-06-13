import {
  IsString,
  IsNotEmpty,
  MaxLength,
  MinLength,
  IsOptional,
  IsMongoId,
} from 'class-validator';

export class UpdatePromptDto {
 
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name?: string;

 
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  content?: string;

  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;
}
