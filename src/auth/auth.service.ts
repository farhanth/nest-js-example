import { Injectable } from '@nestjs/common';
import { comparePassword } from '../utils/bcrypt';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './entity/userToken.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { jwtConstants } from './auth.constants';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,

        @InjectRepository(UserToken)
        private userTokenRepository: Repository<UserToken>
    ) { }

    async validateUser(username: string, password: string) {
        const user = await this.userService.findByUsername(username);

        if (user) {
            const match = comparePassword(password, user.password);
            if (!user.is_active) {
                return null;
            }

            if (match) {
                return user;
            }
        }

        return null;
    }

    async login(user: any) {
        const exist_token = await this.userTokenRepository.findOne({ where: 
            {
                user_id: user.id,
                expired_at: MoreThanOrEqual(new Date())
            }
        });

        if (exist_token) {
            return {
                access_token: exist_token.token,
            };
        }

        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload);

        const date = new Date();
        const expired_sec = parseInt(jwtConstants.expired_time)
        const expired_date = date.setSeconds(date.getSeconds() + expired_sec);

        const userTokenEntity: UserToken = this.userTokenRepository.create();
        userTokenEntity.token = token;
        userTokenEntity.user_id = user.id;
        userTokenEntity.expired_at = new Date(expired_date);

        this.userTokenRepository.save(userTokenEntity);

        return {
            access_token: token,
        };
    }
}
