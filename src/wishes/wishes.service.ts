import { Injectable, UseGuards, NotFoundException, ForbiddenException, Logger } from '@nestjs/common';
import { Repository, Like, FindOneOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Wish } from './wish.entity';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { UsersService } from 'src/users/users.service';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
    private readonly userService: UsersService,
  ) {}

  // создать подарок
  async createWish(createWishDto: CreateWishDto, userId: number): Promise<Wish> {
    const owner = await this.userService.findById(userId);
    const wish = this.wishRepository.create({
      ...createWishDto,
      owner: owner,
    });
    return this.wishRepository.save(wish);
  }

  // найти подарки текущего пользователя
  async findWishesById(userId: number): Promise<Wish[]> {
    const wishes = await this.wishRepository.find({
      where: { owner: { id: userId } },
    });
    if (!wishes.length) {
      throw new NotFoundException(`Подарки для текущего пользователя не найдены`);
    }
    return wishes;
  }

  // получить все подарки
  async findAll(): Promise<Wish[]> {
    return this.wishRepository.find();
  }

  // получить подарок по ИД
  async findOne(query: FindOneOptions<Wish>) {
    const wish = await this.wishRepository.findOneOrFail(query);
    if (!wish) {
      throw new NotFoundException(`Подарок не найден`);
    }
    return wish;
  }

  async findWishById(id: number) {
    if(!id) {
      throw new BadRequestException(`Отсутсвует ИД подарка`);
    }
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: true,
      },
    });
    if (!wish) {
      throw new NotFoundException(`Подарок не найден`);
    }
    return wish;
  }

  // обновить информацию о подарке
  async updateWish(wishId: number, updateWishDto: UpdateWishDto, userId: number): Promise<Wish> {
    const wish = await this.findWishById(wishId);
    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете изменять чужие подарки');
    }
    const updatedWish = await this.wishRepository.merge(wish, updateWishDto);
    return this.wishRepository.save(updatedWish);
  }

  // удалить подарок
  async deleteWish(wishId: number, userId: number): Promise<void> {
    const wish = await this.findWishById(wishId);
    if (wish.owner.id !== userId) {
      throw new ForbiddenException('Вы не можете удалять чужие подарки');
    }
    await this.wishRepository.remove(wish);
  }

  //показать последние добавленные подарки
  async getLastWishes() {
    // return await this.wishRepository.find();
    const wishes = await this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
    if(!wishes) {
      throw new NotFoundException('Последние подарки не найдены');
    }
    return wishes;
  }
  
  //показать популярные подарки
  async getTopWishes() {
    const topWishes = await this.wishRepository.find({
      relations: ['owner', 'offers'],
      order: {
        copied: 'DESC',
      },
      take: 10,
    });
    if(!topWishes.length) {
      throw new NotFoundException('Популярные подарки не найдены');
    }
    return topWishes;
  }

  // получить массиов подароков по ИД
  async getWishesByIds(ids: number[]) {
    const wishes = await Promise.all(ids.map(id => this.findWishById(id)));
    return wishes;
  }
}
