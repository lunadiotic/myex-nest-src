import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { User } from '../users/user.entity';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  create(itemDto: CreateItemDto, user: User) {
    const item = this.itemRepository.create(itemDto);
    item.user = user;
    return this.itemRepository.save(item);
  }
}
