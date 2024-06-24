import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Offer } from './offer.entity';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Injectable()
export class OffersService {
    constructor(
      @InjectRepository(Offer)
      private readonly offerRepository: Repository<Offer>,
    ) {}
  
    async create(createOfferDto: CreateOfferDto): Promise<Offer> {
      const newOffer = this.offerRepository.create(createOfferDto);
      return this.offerRepository.save(newOffer);
    }
    

    findOne(id: number): Promise<Offer> {
      return this.offerRepository.findOneBy({ id });
    } 

    findAll(): Promise<Offer[]> {
      return this.offerRepository.find();
    }

    async updateOne(id: number, updateOfferDto: UpdateOfferDto): Promise<Offer> {
      await this.offerRepository.update({ id }, updateOfferDto);
      const updatedUser = await this.findOne(id);
      return updatedUser;
    }

    removeOne(id: number) {
      return this.offerRepository.delete({ id });
    }
  }