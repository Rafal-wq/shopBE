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

  @Delete('/all/:userId')
  clearBasket(@Param('userId') userId: string) {
    this.basketService.clearBasket(userId);
  }

  @Delete('/:itemInBasketId/:userId')
  removeProduct(
    @Param('itemInBasketId') itemInBasketId: string,
    @Param('userId') userId: string,
  ): Promise<RemoveFromBasketResponse> {
    return this.basketService.remove(itemInBasketId, userId);
  }

  @Get('/admin')
  getBasketForAdmin(): Promise<GetBasketResponse> {
    return this.basketService.getAllForAdmin();
  }

  @Get('/:userId')
  getBasket(@Param('userId') userId: string): Promise<GetBasketResponse> {
    return this.basketService.getAllForUser(userId);
  }

  @Get('/total-price/:userId')
  getTotalBasketPrice(
    @Param('userId') userId: string,
  ): Promise<GetTotalBasketPriceResponse> {
    return this.basketService.getTotalPrice(userId);
  }
}
