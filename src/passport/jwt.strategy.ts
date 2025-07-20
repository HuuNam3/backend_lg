import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserAccountsService } from 'src/modules/user-accounts/user-accounts.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly TService: UserAccountsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '1af6cdf25f1a6927db0ecdd811f0c68e',
    });
  }

  async validate(payload: any) {
    const profile = await this.TService.findByEmailOrUsername(payload.email);
    return profile;
  }
}
