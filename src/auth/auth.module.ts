import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth.constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserToken } from './entity/userToken.entity';
import { JwtStrategy } from './jwt.strategy';
import { JwtUtil } from '../utils/jwt';

@Module({
    controllers: [AuthController],
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: jwtConstants.expired_time },
        }),
        TypeOrmModule.forFeature([UserToken])
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, JwtUtil],
})
export class AuthModule { }
