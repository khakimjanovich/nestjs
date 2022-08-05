import {Expose, Transform} from "class-transformer";

export class ReportDto {
    @Expose()
    id: number;
    @Expose()
    price: number;
    @Expose()
    year: number;
    @Expose()
    lng: number;
    @Expose()
    ltd: number;
    @Expose()
    maker: string;
    @Expose()
    model: string;
    @Expose()
    mileage: number;
    @Expose()
    approved: boolean;

    @Transform(({obj}) => obj.user.id)
    @Expose()
    userId: number;
}