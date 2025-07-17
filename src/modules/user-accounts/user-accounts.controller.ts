import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserAccountsService } from './user-accounts.service';

@Controller('user-accounts')
export class UserAccountsController {
  constructor(private readonly userAccountsService: UserAccountsService) {}
  @Get()
  findAll() {
    return this.userAccountsService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.userAccountsService.create(body);
  }
}
