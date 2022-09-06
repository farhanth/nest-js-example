import { Controller, Get, UseGuards, Headers, Patch, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateUserDto } from '../user/dto/user-update.dto';
import { UserService } from '../user/user.service';
import { JwtUtil } from '../utils/jwt';

@UseGuards(AuthGuard('jwt'))
@Controller('profile')
export class ProfileController {
    constructor(
        private userService: UserService,
        private jwtUtil: JwtUtil
    ) { }

    @Get('/')
    profile(@Headers('Authorization') auth: string) {
        const jwt_decode = this.jwtUtil.decode(auth);
        return this.userService.getDetail(jwt_decode['sub']);
    }

    @Patch('/update')
    Update(@Headers('Authorization') auth: string, @Body() updateUserDto: UpdateUserDto) {
        const jwt_decode = this.jwtUtil.decode(auth);
        return this.userService.update(updateUserDto, jwt_decode['sub']);
    }
}
