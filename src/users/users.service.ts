import { Injectable } from '@nestjs/common';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { hashValue } from 'src/helpers/hash';
import { NotFoundException } from '@nestjs/common/exceptions';
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

    async findById(id: number):  Promise<User> {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException(`Пользователь  с ${id} не найден`);
      }
      return user;
    }

    async findOne(query: FindOneOptions<User>) {
      const user = this.userRepository.findOneOrFail(query);
      if (!user) {
        throw new NotFoundException('Пользователь не найден');
      }
      return user;
    } 
    
    async updateOne(query: FindOneOptions<User>, updateUserDto: UpdateUserDto) {
      const { password } = updateUserDto;
      const user = await this.findOne(query);
      if (password) {
        updateUserDto.password = await hashValue(password);
      }
      return this.userRepository.save({...user, ...updateUserDto});
    }

    async removeOne(query: FindOneOptions<User>) {
      const user = await this.findOne(query);
      await this.userRepository.remove(user);
    }

  }