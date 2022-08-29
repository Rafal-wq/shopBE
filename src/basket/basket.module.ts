import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { ShopService } from '../shop/shop.service';

@Module({
  providers: [BasketService, ShopService],
  controllers: [BasketController],
})
export class BasketModule {}
