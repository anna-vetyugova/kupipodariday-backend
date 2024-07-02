import { Length, IsUrl, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  username?: string;

  @IsString()
  @Length(2, 200)
  about?: string;
  
  @IsUrl()
  avatar?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsString()
  @MinLength(2)
  password?: string;
}