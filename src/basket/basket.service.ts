import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { AddItemDto } from './dto/add-item.dto';
import { ItemInBasket } from './item-in-basket.entity';
import {
  AddToBasketResponse,
  GetBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';

@Injectable()
export class BasketService {
  constructor(@Inject(ShopService) private shopService: ShopService) {}

  async add(product: AddItemDto): Promise<AddToBasketResponse> {
    const { count, name } = product;

    if (
      typeof name !== 'string' ||
      typeof count !== 'number' ||
      name === '' ||
      count < 1 ||
      !(await this.shopService.hasItem(name))
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();
    item.name = name;
    item.count = count;

    await item.save();

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(id: string): Promise<RemoveFromBasketResponse> {
    const item = await ItemInBasket.findOne({ where: { id } });
    if (item) {
      await item.remove();

      return {
        isSuccess: true,
      };
    }

    return {
      isSuccess: false,
    };
  }

  async getAll(): Promise<ItemInBasket[]> {
    return ItemInBasket.find();
  }

  async getTotalPrice(): Promise<GetTotalBasketPriceResponse> {
    const items = await this.getAll();

    return (
      await Promise.all(
        items.map(
          async (item) =>
            (await this.shopService.getPrice(item.name)) * item.count * 1.23,
        ),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }
}
