import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common/decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService){}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Get('/all')
  async findAll() {
    return this.userService.findAll();
  }
}
