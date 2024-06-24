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
  
    create(createUserDto: CreateUserDto): Promise<User> {
      return this.userRepository.save(createUserDto);
    }
     
    findOne(id: number): Promise<User> {
      return this.userRepository.findOneBy({ id });
    } 

    findAll(): Promise<User[]> {
      return this.userRepository.find();
    }

    async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
      await this.userRepository.update({ id }, updateUserDto);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    }

    removeOne(id: number) {
      return this.userRepository.delete({ id });
    }
  }