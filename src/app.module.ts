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
import { CacheModule } from './cache/cache.module';
import { DiscountCodeModule } from './discount-code/discount-code.module';
import { CronModule } from './cron/cron.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmConfig), UserModule, CacheModule, DiscountCodeModule, CronModule, MailModule],
  controllers: [AppController, ShopController, BasketController],
  providers: [AppService, ShopService, BasketService],
  exports: [TypeOrmModule],
})
export class AppModule {}
