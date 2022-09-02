import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    getList(): Promise<User[]> {
        return this.userRepository.find();
    }

    store(createUserDto: CreateUserDto) {
        return this.userRepository.save(createUserDto);
    }

    update(updateUserDto: UpdateUserDto, userId: number) {
        return this.userRepository.update(userId, updateUserDto);
    }

    getDetail(userId: number) {
        return this.userRepository.findOne({ where: { id: userId } });
    }

    findByEmail(email: string) {
        return this.userRepository.findOne({ where: { email: email } });
    }

    delete(userId: number) {
        return this.userRepository.delete(userId);
    }
}
