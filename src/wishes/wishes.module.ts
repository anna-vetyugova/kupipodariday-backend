import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishesController } from './wishes.controller';
import { WishesService } from './wishes.service';
import { Wish } from './wish.entity';
import { User } from 'src/users/user.entity';
import { Offer } from 'src/offers/offer.entity';
import { Wishlist } from 'src/wishlists/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wish, User, Offer, Wishlist])],
  providers: [WishesService],
  controllers: [WishesController],
  exports: [WishesService],
})
export class WishesModule {}