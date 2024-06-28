import { IsString, MaxLength } from "class-validator";

export class CreateCompanyDto {
    @IsString()
    @MaxLength(120)
    name:string;
}
