import { Length, IsUrl, IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 30)
  username: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar?: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty()
  password: string;
}