import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Wish } from 'src/wishes/wish.entity';
import { Offer } from 'src/offers/offer.entity';
import { Wishlist } from 'src/wishlists/wishlist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Wish, Offer, Wishlist])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}