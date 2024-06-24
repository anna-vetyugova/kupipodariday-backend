import { IsNotEmpty, IsString, IsUrl, Length, IsNumber } from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 250)
  readonly name: string;

  @IsString()
  @Length(1, 1500)
  readonly description?: string;

  @IsUrl()
  readonly image?: string;

  @IsNumber({}, { each: true })
  readonly items?: number[];
}
