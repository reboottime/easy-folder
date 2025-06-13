import { IsString, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateFolderDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  name: string;
}
