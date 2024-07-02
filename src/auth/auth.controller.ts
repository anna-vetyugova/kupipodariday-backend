
import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { SinginUserDto } from './dto/signup-user.dto';
import { JwtAuthGuard } from './guard/jwt.auth.guard';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  login(
    @AuthUser() user,
    @Body() singinUserDto: SinginUserDto,
    ): Promise<any> {
    console.log(user);

    return this.authService.login(user);
  }

  @Post('auth/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.signup(createUserDto);
    return user;
  }

}