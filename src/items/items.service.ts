import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  create(itemDto: CreateItemDto) {
    const item = this.itemRepository.create(itemDto);
    return this.itemRepository.save(item);
  }
}
