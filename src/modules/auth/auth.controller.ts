import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
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
  login(@Request() req, @Res({ passthrough: true }) res: Response) {
    return this.TService.login(req.user, res);
  }

  @Post('refresh-token')
  async refreshToken(
    @Body() { refreshToken }: { refreshToken: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    if (!refreshToken) {
      throw new BadRequestException('refresh token is required');
    }
    const user = await this.TService.verfiyRefreshToken(refreshToken);
    if (user) {
      return this.TService.login(user, res);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
