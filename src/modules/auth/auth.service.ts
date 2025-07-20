import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserAccountsService } from '../user-accounts/user-accounts.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly TService: UserAccountsService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };
    return {
      access_token: await this.jwtService.sign(payload),
    };
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
