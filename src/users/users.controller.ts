import {
  Body,
  Controller,
  Post,
  Param,
  NotFoundException,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { Get, Patch, UseGuards } from '@nestjs/common/decorators';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { WishesService } from 'src/wishes/wishes.service';
import { Wish } from 'src/wishes/wish.entity';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly wishService: WishesService,
  ) {}

  // получить данные по своему профилю
  @Get('me')
  async findOwn(@AuthUser() user: User): Promise<User> {
    return this.userService.findOne({
      where: { id: user.id },
      select: {
        email: true,
        username: true,
        id: true,
        avatar: true,
        about: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  // получить всех пользователей
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  // обновить данные по своему профилю
  @Patch('me')
  async updateOne(
    @AuthUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateOne(
      { where: { id: user.id } },
      updateUserDto,
    );
  }

  // получить данные профиля по имени
  @Get(':username')
  async getUserProfile(@Param('username') userName: string) {
    const user = await this.userService.findByName(userName);
    if (!user) {
      throw new NotFoundException(
        `Пользователь с имененм ${userName} не найден`,
      );
    }
    return user;
  }

  // найти пользователя по почте или имени
  @Post('find')
  async findMany(@Query('query') query: string) {
    if (!query) {
      throw new BadRequestException(
        `Для поиска требуется указать или имя пользователя или его электронный адрес`,
      );
    }
    const user = await this.userService.findMany(query);
    return user;
  }

  // получить список подароков текущего пользователя
  @Get('me/wishes')
  async findMyWishes(@AuthUser() user: User): Promise<Wish[]> {
    const wishes = this.wishService.findWishesById(user.id);
    if (!wishes) {
      throw new NotFoundException(`У пользователя нет подароков`);
    }
    return wishes;
  }

  // получить список подароков пользователя по имени
  @Get(':username/wishes')
  async findWishes(@Param('username') userName: string): Promise<Wish[]> {
    const userData = await this.userService.findByName(userName);
    const wishes = this.wishService.findWishesById(userData.id);
    if (!wishes) {
      throw new NotFoundException(`У пользователя нет подароков`);
    }
    return wishes;
  }
}
