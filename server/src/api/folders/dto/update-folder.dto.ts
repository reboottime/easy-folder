import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class UpdateFolderDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @MaxLength(100)
  description: string;
}
