import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { AddItemDto } from './dto/add-item.dto';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';

@Controller('basket')
export class BasketController {
  constructor(@Inject(BasketService) private basketService: BasketService) {}

  @Post('/')
  addProductToBasket(
    @Body() product: AddItemDto,
  ): Promise<AddToBasketResponse> {
    return this.basketService.add(product);
  }

  @Delete('/:index')
  removeProduct(
    @Param('index') index: string,
  ): Promise<RemoveFromBasketResponse> {
    return this.basketService.remove(index);
  }

  @Get('/')
  getBasket(): Promise<GetBasketResponse> {
    return this.basketService.getAll();
  }

  @Get('/total-price')
  getTotalBasketPrice(): Promise<GetTotalBasketPriceResponse> {
    return this.basketService.getTotalPrice();
  }
}
