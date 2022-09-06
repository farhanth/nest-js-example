import { Controller, Post, UseGuards, Request, Get, Headers } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtUtil } from '../utils/jwt';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private jwtUtil: JwtUtil,
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('/login')
    async login(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/logout')
    async logout(@Headers('Authorization') auth: string) {
        const jwt_decode = this.jwtUtil.decode(auth);
        const jwt_token = auth.replace('Bearer ', '');
        return this.authService.logout(jwt_decode['sub'], jwt_token);
    }
}
