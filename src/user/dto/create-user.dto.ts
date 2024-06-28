import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsUUID()
    companyId: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    lastName: string;

    @IsOptional()
    isActive: boolean = false;

    @IsNumber({
        allowNaN: false,
        maxDecimalPlaces: 2,
        allowInfinity: false
    })
    @IsPositive()
    @Type(() => Number)
    salary: number;
}
