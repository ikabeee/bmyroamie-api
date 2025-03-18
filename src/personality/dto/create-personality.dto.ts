import { IsNotEmpty, IsString } from "class-validator";

export class CreatePersonalityDto {
    @IsString()
    @IsNotEmpty()
    name:string;
}
