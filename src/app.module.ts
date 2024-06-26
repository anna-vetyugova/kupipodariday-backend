import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { UsersModule } from './users/users.module';
import { WishesModule } from './wishes/wishes.module';
import { WishlistsModule } from './wishlists/wishlists.module';
import { OffersModule } from './offers/offers.module';
import * as Joi from 'joi';

const schema = Joi.object({
  port: Joi.number().integer().default(3000),
  database: Joi.object({
    url: Joi.string().pattern(/postgres:\/\/[a-zA-Z]/).required(),
    port: Joi.number().integer().required(),
  }),
});
@Module({
  imports: [
    ConfigModule.forRoot({ 
      validationSchema: schema,
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'student',
      password: 'student',
      database: 'nest_project',
      //entities: [User, Wish, Wishlist, Offer],
      autoLoadEntities: true,
      synchronize: true, //синхронизация с БД
    }),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
