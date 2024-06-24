import { IsUrl, IsNumber, IsBoolean } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  user: number;

  @IsUrl()
  item: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsBoolean()
  hidden: boolean;
}