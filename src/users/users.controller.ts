import { Body, Controller, Post, Req } from '@nestjs/common';
import { Get, Patch, UseGuards } from '@nestjs/common/decorators';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ){}

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
    })
  }

  // @Get('me/posts')
  // async findMyPosts(@AuthUser() user: User): Promise<Post[]> {
  //   return await this.postService.findPostById(user.id);
  // }

  // @Patch('me')
  // async updateOne(@AuthUser() user:User, @Body() updateUserDto: UpdateUserDto) {
  //   const { id } = user;
  //   return this.userService.updateOne(id, updateUserDto);
  // }
  @Patch('me')
  async updateOne(@AuthUser() user: User, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateOne({ where: { id: user.id } }, updateUserDto);
  }

}

