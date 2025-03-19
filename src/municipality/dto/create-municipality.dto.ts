import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMunicipalityDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    stateId: number;
}
