import { IsUrl, IsNumber, IsBoolean } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateOfferDto {
  @IsNumber()
  itemId: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsBoolean()
  hidden: boolean;
}