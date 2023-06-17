import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from './item.entity';
import { CreateItemDto } from './dtos/create-item.dto';
import { User } from '../users/user.entity';
import { QueryItemDto } from './dtos/query-item.dto';
@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
  ) {}

  async getAllItems(queryItemDto: QueryItemDto): Promise<Item[]> {
    const queryBuilder = this.itemRepository.createQueryBuilder('item');

    // Tambahkan klausa WHERE berdasarkan data yang ada dalam QueryItemDto
    if (queryItemDto.name) {
      queryBuilder.andWhere('item.name LIKE :name', {
        name: `%${queryItemDto.name}%`,
      });
    }
    if (queryItemDto.category) {
      queryBuilder.andWhere('item.category LIKE :category', {
        category: `%${queryItemDto.category}%`,
      });
    }
    if (queryItemDto.year) {
      queryBuilder.andWhere('item.year LIKE :year', {
        year: `%${queryItemDto.year}%`,
      });
    }
    if (queryItemDto.location) {
      queryBuilder.andWhere('item.location LIKE :location', {
        location: `%${queryItemDto.location}%`,
      });
    }

    return queryBuilder.getRawMany();
  }

  create(itemDto: CreateItemDto, user: User) {
    const item = this.itemRepository.create(itemDto);
    item.user = user;
    return this.itemRepository.save(item);
  }

  async approve(id: number, approved: boolean) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException('Item not found');
    }
    item.approved = approved;
    return this.itemRepository.save(item);
  }
}
