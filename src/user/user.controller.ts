import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    getList() {
        return this.userService.getList();
    }

    @Post()
    store(@Body() createUserDto: CreateUserDto) {
        return this.userService.store(createUserDto);
    }

    @Patch('/:userId')
    update(@Body() updateUserDto: UpdateUserDto, @Param('userId', ParseIntPipe) userId: Number) {
        return this.userService.update(updateUserDto, userId);
    }

    @Get('/:userId')
    getDetail(@Param('userId', ParseIntPipe) userId: Number) {
        return this.userService.getDetail(userId);
    }

    @Delete('/:userId')
    deleteUser(@Param('userId', ParseIntPipe) userId: Number) {
        return this.userService.delete(userId);
    }
}
