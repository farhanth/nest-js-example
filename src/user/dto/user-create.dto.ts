import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString } from "class-validator";


export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    phone_number: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsBoolean()
    @Transform(({ value }) => {
        return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    })
    is_active: boolean;
}