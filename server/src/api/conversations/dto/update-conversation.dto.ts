import { IsString, IsOptional, IsMongoId } from 'class-validator';

export class UpdateConversationDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  title?: string;
}
