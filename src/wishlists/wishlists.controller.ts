import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt.auth.guard';
import { AuthUser } from 'src/common/decorators/user.decorators';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { WishlistsService } from './wishlists.service';

@UseGuards(JwtAuthGuard)
@Controller('wishlistlists')
export class WishlistsController {
  constructor(
    private readonly wishlistService: WishlistsService,
  ){}

  // создать коллекцию
  @Post()
  create(@Body() createWishlistDto: CreateWishlistDto, @AuthUser() user) {
    return this.wishlistService.createWishlist(createWishlistDto, user);
  }

  // получить все коллекции
  @Get()
  findAll() {
    return this.wishlistService.findAll();
  }

  // получить конкретную коллекцию
  @Get(':id')
  findWishListById(@Param('id') id: number) {
    return this.wishlistService.findWisheListById(id);
  }
}
