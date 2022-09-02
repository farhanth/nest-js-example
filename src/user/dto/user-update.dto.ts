import { Transform } from "class-transformer";
import { IsBoolean, IsEmail, IsString } from "class-validator";


export class UpdateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;

    @IsString()
    phone_number: string;

    @IsBoolean()
    @Transform(({ value }) => {
        return [true, 'enabled', 'true', 1, '1'].indexOf(value) > -1;
    })
    is_active: boolean;
}