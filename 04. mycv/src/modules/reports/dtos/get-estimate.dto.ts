import {Transform} from "class-transformer";
import {IsLatitude, IsLongitude, IsNumber, IsString, Max, Min} from "class-validator";

export class GetEstimateDto {
    @IsString()
    make: string;

    @IsString()
    model: string;

    @Transform(({value}) => parseInt(value))
    @Min(1900)
    @Max(2023)
    @IsNumber()
    year: number;

    @Transform(({value}) => parseFloat(value))
    @IsLongitude()
    lng: number;

    @Transform(({value}) => parseFloat(value))
    @IsLatitude()
    ltd: number;

    @Transform(({value}) => parseInt(value))
    @Min(0)
    @Max(1000000)
    @IsNumber()
    mileage: number;
}