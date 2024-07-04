import { ForbiddenException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wishlist } from './wishlist.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/user.entity';
import { Wish } from 'src/wishes/wish.entity';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly wishService: WishesService,
  ) {}

  // создать список
  async createWishlist(createWishlistDto: CreateWishlistDto, user: User): Promise<Wishlist> {
    const { itemsId } = createWishlistDto;
    const wishes = await this.wishService.getWishesByIds(itemsId);
    console.log(wishes);
    if (wishes.length === 0) {
      throw new ForbiddenException('Коллекция не может быть пустой');
    };
    const wishlist = this.wishlistRepository.create({
      ...createWishlistDto,
      items: wishes,
      owner: user,
    });
    return this.wishlistRepository.save(wishlist);
  }
    
  // получить коллекцию по ИД
  async findWisheListById(id: number): Promise<Wishlist> {
    const owner = 1;
    const wishelist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['items', 'owner'],
    });


    if (!wishelist) {
      throw new NotFoundException(`Коллекция не найдена`);
    }
    return wishelist;
  }

  // получить все коллекции
  async findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find({
      relations: ['items', 'owner']
    });
  }

  
}
