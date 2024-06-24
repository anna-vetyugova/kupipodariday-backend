import { Length, IsUrl, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @Length(2, 200)
  about: string;

  @IsUrl()
  avatar: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(2)
  password: string;
}