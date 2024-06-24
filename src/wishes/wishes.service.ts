import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}

  create(createWishDto: CreateWishDto) {
    return this.wishRepository.save(createWishDto);
  }

  findOne(id: number): Promise<Wish> {
    return this.wishRepository.findOneBy({ id });
  }

  findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  async updateOne(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    await this.wishRepository.update({ id }, updateWishDto);
    return this.findOne(id);
  }

  removeOne(id: number) {
    return this.wishRepository.delete({ id });
  }
}
