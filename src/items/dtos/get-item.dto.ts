import { IsString } from 'class-validator';

export class GetItemDto {
  @IsString()
  name: string;

  @IsString()
  location: string;

  @IsString()
  category: string;

  @IsString()
  year: string;
}
