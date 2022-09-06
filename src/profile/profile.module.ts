import { Module } from '@nestjs/common';
import { JwtUtil } from '../utils/jwt';
import { UserModule } from '../user/user.module';
import { ProfileController } from './profile.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ProfileController],
  imports: [UserModule],
  providers: [JwtService, JwtUtil],
})
export class ProfileModule {}
