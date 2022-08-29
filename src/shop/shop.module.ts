import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';

@Module({
  imports: [],
  providers: [ShopService],
  controllers: [ShopController],
})
export class ShopModule {}
