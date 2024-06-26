import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
    ) {}
  
    async create(createUserDto: CreateUserDto) {
      return this.userRepository.save(createUserDto);
    }
     
    async findOne(id: number) {
      return this.userRepository.findOneBy({ id });
    } 

    async findAll() {
      return this.userRepository.find();
    }

    async updateOne(id: number, updateUserDto: UpdateUserDto) {
      await this.userRepository.update({ id }, updateUserDto);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    }

    removeOne(id: number) {
      return this.userRepository.delete({ id });
    }
  }