import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishlistsController } from './wishlists.controller';
import { WishlistsService } from './wishlists.service';
import { Wishlist } from './wishlist.entity';
import { User } from 'src/users/user.entity';
import { Wish } from 'src/wishes/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist, User, Wish])],
  providers: [WishlistsService],
  controllers: [WishlistsController],
  exports: [WishlistsService],
})
export class WishlistsModule {}