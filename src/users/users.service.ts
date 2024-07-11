import { Injectable, UseGuards } from '@nestjs/common';
import { FindOneOptions, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashValue } from 'src/helpers/hash';
import { NotFoundException } from '@nestjs/common/exceptions';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const user = await this.userRepository.create({
      ...createUserDto,
      password: await hashValue(password),
    });
    return this.userRepository.save(user);
  }

  // получить всех пользователей
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  @UseGuards(JwtAuthGuard)
  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Пользователь  с ${id} не найден`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  @UseGuards(JwtAuthGuard)
  async findByName(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: {
        username: true,
        password: false,
        id: true,
        createdAt: true,
        updatedAt: true,
        about: true,
        avatar: true,
        email: false,
      },
      where: { username },
    });
    if (!user) {
      throw new NotFoundException(`Пользователь ${username} не найден`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  async findMany(query: string): Promise<User> {
    const user = await this.userRepository.findOne({
      select: {
        username: true,
        password: false,
        id: true,
        createdAt: true,
        updatedAt: true,
        about: true,
        avatar: true,
        email: false,
      },
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });
    if (!user) {
      throw new NotFoundException(`Пользователь не найден`);
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  async findOne(query: FindOneOptions<User>) {
    const user = this.userRepository.findOneOrFail(query);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    return user;
  }

  @UseGuards(JwtAuthGuard)
  async updateOne(query: FindOneOptions<User>, updateUserDto: UpdateUserDto) {
    const { password } = updateUserDto;
    const user = await this.userRepository.findOne(query);
    if (password) {
      updateUserDto.password = await hashValue(password);
    }
    return this.userRepository.save({ ...user, ...updateUserDto });
  }

  @UseGuards(JwtAuthGuard)
  async removeOne(query: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(query);
    await this.userRepository.remove(user);
  }
}
