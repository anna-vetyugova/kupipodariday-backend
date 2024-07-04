
import { Controller, Post, Body, UseGuards, BadRequestException  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { SinginUserDto } from './dto/signup-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  login(
    @AuthUser() user,
    @Body() singinUserDto: SinginUserDto,
    ): Promise<any> {
    console.log(user);
    if (!user) {
      throw new BadRequestException(`Некорректный email или пароль`);
    }
    return this.authService.login(user);
  }

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(createUserDto.email);
    if (user) {
      throw new BadRequestException(`Пользователь с указанным email уже существует`);
    }

    const newUser = await this.usersService.signup(createUserDto);
    return newUser;
  }

}