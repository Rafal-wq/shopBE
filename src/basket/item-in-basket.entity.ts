import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AddItemDto } from './dto/add-item.dto';

@Entity()
export class ItemInBasket extends BaseEntity implements AddItemDto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  count: number;

  @Column({
    length: 50,
  })
  name: string;
}
