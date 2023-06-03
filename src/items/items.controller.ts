import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateItemDto } from './dtos/create-item.dto';
import { ItemsService } from './items.service';
import { AuthGuard } from '../guards/auth.guard';

@Controller('items')
export class ItemsController {
  constructor(private itemService: ItemsService) {}

  @Post
  @UseGuards(AuthGuard)
  createItem(@Body() body: CreateItemDto) {
    return this.itemService.create(body);
  }
}
