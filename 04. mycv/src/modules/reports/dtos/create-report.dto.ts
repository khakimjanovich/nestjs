import {IsNumber, IsString, Min, Max, IsLongitude, IsLatitude} from "class-validator";

export class CreateReportDto {
    @IsNumber()
    @Min(0)
    @Max(10000000000)
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @Min(1900)
    @Max(2023)
    @IsNumber()
    year: number;

    @IsLongitude()
    lng: number;

    @IsLatitude()
    ltd: number;

    @Min(0)
    @Max(1000000)
    @IsNumber()
    mileage: number;
}