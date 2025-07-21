import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { hash } from 'bcrypt';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { CreateUserAccountsDto } from 'src/dto/create-user-accounts.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly TService: AuthService) {}
  @Post('/register')
  async create(@Body() userData: CreateUserAccountsDto) {
    return this.TService.register(userData);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.TService.login(req.user);
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      throw new BadRequestException('refresh token is required');
    }
    const user = await this.TService.verfiyRefreshToken(refreshToken);
    if (user) {
      return this.TService.login(user);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
