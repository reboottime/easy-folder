import { IsString, IsBoolean, IsOptional, IsMongoId } from 'class-validator';

export class UpdateConversationDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;

  @IsOptional()
  @IsBoolean()
  bookmarked?: boolean;
}
