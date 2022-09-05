import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user-create.dto';
import { UpdateUserDto } from './dto/user-update.dto';
import { User } from './entity/user.entity';
import { hashPassword } from '../utils/bcrypt';

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
        const password = hashPassword(createUserDto.password);
        const data = this.userRepository.create({ ...createUserDto, password});
        
        return this.userRepository.save(data);
    }

    update(updateUserDto: UpdateUserDto, userId: number) {
        const password = hashPassword(updateUserDto.password);
        const data = this.userRepository.create({ ...updateUserDto, password});

        return this.userRepository.update(userId, data);
    }

    getDetail(userId: number) {
        return this.userRepository.findOne({ where: { id: userId } });
    }

    findByUsername(username: string) {
        return this.userRepository.findOne({ where: { username: username } });
    }

    delete(userId: number) {
        return this.userRepository.delete(userId);
    }
}
