import { Controller, Post, Body } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Post
  createItem(@Body() body: CreateItemDto) {
    return 'This action adds a new item';
  }
}
