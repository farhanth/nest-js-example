import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';

@Injectable()
export class UserService {
    getList() {
        return { name: 'Farhan', email: 'farhan@isysedge.com' };
    }

    store(createUserDto: CreateUserDto) {
        return createUserDto;
    }

    update(updateUserDto: UpdateUserDto, userId: Number) {
        return { body: updateUserDto, userId };
    }

    getDetail(userId: Number) {
        return userId;
    }

    delete(userId: Number) {
        return userId;
    }
}
