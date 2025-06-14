import { IsString, IsOptional, IsMongoId, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @IsOptional()
  @IsString()
  @IsMongoId()
  folderId?: string;

  @IsString()
  @IsUUID()
  conversationId: string;

  @IsOptional()
  @IsString()
  note?: string;

  @IsOptional()
  @IsString()
  title: string;
}
