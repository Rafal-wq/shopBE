import { Inject, Injectable } from '@nestjs/common';
import { ShopService } from '../shop/shop.service';
import { AddItemDto } from './dto/add-item.dto';
import { ItemInBasket } from './item-in-basket.entity';
import {
  AddToBasketResponse,
  GetTotalBasketPriceResponse,
  RemoveFromBasketResponse,
} from '../interfaces/basket';
import { UserService } from '../user/user.service';
import {User} from "../user/user.entity";

@Injectable()
export class BasketService {
  constructor(
    @Inject(ShopService) private shopService: ShopService,
    @Inject(UserService) private userService: UserService,
  ) {}

  async add(product: AddItemDto, user: User): Promise<AddToBasketResponse> {
    const { count, productId } = product;

    const shopItem = await this.shopService.getOneItem(productId);

    if (
      typeof productId !== 'string' ||
      typeof count !== 'number' ||
      productId === '' ||
      count < 1 ||
      !shopItem
    ) {
      return {
        isSuccess: false,
      };
    }

    const item = new ItemInBasket();
    item.count = count;

    await item.save();

    item.shopItem = shopItem;
    item.user = user;

    await item.save();

    // await this.mailService.sendMail(
    //   user.email,
    //   'Dziękujemy za dodanie do koszyka!',
    //   addedToBasketInfoEmailTemplate(),
    // );

    return {
      isSuccess: true,
      id: item.id,
    };
  }

  async remove(
    itemInBasketId: string,
    userId: string,
  ): Promise<RemoveFromBasketResponse> {
    const user = await this.userService.getOneUser(userId);
    if (!user) {
      throw new Error('User not found!');
    }
    const item = await ItemInBasket.findOne({
      where: {
        user: user.valueOf(),
        id: itemInBasketId,
      },
    });
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

  async getAllForUser(userId: string): Promise<ItemInBasket[]> {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found!');
    }

    return ItemInBasket.find({
      where: { user: user.valueOf() },
      relations: ['shopItem'],
    });
  }

  async getAllForAdmin(): Promise<ItemInBasket[]> {
    return ItemInBasket.find({ relations: ['shopItem', 'user'] });
  }

  async clearBasket(userId: string) {
    const user = await this.userService.getOneUser(userId);

    if (!user) {
      throw new Error('User not found');
    }

    await ItemInBasket.delete({
      user: user.valueOf(),
    });
  }

  async getTotalPrice(userId: string): Promise<GetTotalBasketPriceResponse> {
    const items = await this.getAllForUser(userId);

    return (
      await Promise.all(
        items.map(async (item) => item.shopItem.price * item.count * 1.23),
      )
    ).reduce((prev, curr) => prev + curr, 0);
  }

  // async getStats(): Promise<GetBasketStatsResponse> {
  //   const { itemInBasketAvgPrice } = await getConnection()
  //     .createQueryBuilder()
  //     .select('xxxx', 'itemInBasketAvgPrice');
  // } //@TODO
}
