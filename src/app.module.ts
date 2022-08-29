import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/config';
import { ShopModule } from './shop/shop.module';
import { BasketModule } from './basket/basket.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ShopModule,
    BasketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
