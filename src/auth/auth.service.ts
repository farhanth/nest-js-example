import { Injectable } from '@nestjs/common';
import { comparePassword } from '../utils/bcrypt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private userService: UserService) { }

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
}
