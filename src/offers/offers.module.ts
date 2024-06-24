import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { Offer } from './offer.entity';
import { User } from 'src/users/user.entity';
import { Wish } from 'src/wishes/wish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Offer, User, Wish])],
  providers: [OffersService],
  controllers: [OffersController],
  exports: [OffersService],
})
export class OffersModule {}