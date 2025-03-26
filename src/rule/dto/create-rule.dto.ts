import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRuleDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    adId: number;
}
