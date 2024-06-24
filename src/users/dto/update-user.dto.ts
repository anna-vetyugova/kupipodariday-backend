import { Length, IsUrl, IsEmail, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(2, 30)
  readonly username?: string;

  @IsString()
  @Length(2, 200)
  readonly about?: string;
  
  @IsUrl()
  readonly avatar?: string;

  @IsString()
  @IsEmail()
  readonly email?: string;

  @IsString()
  @MinLength(2)
  readonly password?: string;
}