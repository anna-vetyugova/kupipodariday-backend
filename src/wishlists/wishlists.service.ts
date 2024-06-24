import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto) {
    return this.wishlistRepository.save(createWishlistDto);
  }

  findOne(id: number): Promise<Wishlist> {
    return this.wishlistRepository.findOneBy({ id });
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async updateOne(id: number, updateWishlistDto: UpdateWishlistDto): Promise<Wishlist> {
    await this.wishlistRepository.update({ id }, updateWishlistDto);
    return this.findOne(id);
  }

  removeOne(id: number) {
    return this.wishlistRepository.delete({ id });
  }
}
