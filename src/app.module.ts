import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopController } from './shop/shop.controller';
import { BasketController } from './basket/basket.controller';
import { ShopService } from './shop/shop.service';
import { BasketService } from './basket/basket.service';
import { typeOrmConfig } from './config/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), UserModule],
  controllers: [AppController, ShopController, BasketController],
  providers: [AppService, ShopService, BasketService],
  exports: [TypeOrmModule],
})
export class AppModule {}
