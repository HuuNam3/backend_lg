import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserAccountsModule } from '../user-accounts/user-accounts.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from 'src/passport/local.strategy';
import { JwtStrategy } from 'src/passport/jwt.strategy';

@Module({
  imports: [
    UserAccountsModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: "1af6cdf25f1a6927db0ecdd811f0c68e",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
