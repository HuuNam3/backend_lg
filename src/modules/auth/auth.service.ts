import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAccountsService } from '../user-accounts/user-accounts.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { hash } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly TService: UserAccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  register(user: any) {
    return this.TService.create(user);
  }

  login(user: any) {
    const payload = { email: user.email, sub: user._id };

    const refresh_token = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRE'),
    });

    this.saveRefreshToken(refresh_token, user._id);

    return {
      access_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_TOKEN_EXPIRE'),
      }),
      refresh_token: refresh_token,
    };
  }

  async saveRefreshToken(refresh_token: string, userId: string) {
    const user = await this.TService.findOne(userId);
    if (user) {
      user.refresh_token = await hash(refresh_token, 10);
      console.log(user);
    }
  }

  async verfiyRefreshToken(refreshToken: string) {
    const decoded = this.jwtService.decode(refreshToken);
    if (!decoded) {
      return false;
    }
    const user = await this.TService.findOne(decoded.sub);
    if (user) {
      return user;
    }
    return false;
  }

  async validateUser(identifier: string, password: string) {
    const user = await this.TService.findByEmailOrUsername(identifier);
    if (!user) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu sai',
        HttpStatus.UNAUTHORIZED,
      );
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new HttpException(
        'Tài khoản hoặc mật khẩu sai!',
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
