import {CallHandler, ExecutionContext, NestInterceptor, UseInterceptors} from "@nestjs/common";
import {map, Observable} from "rxjs";
import {plainToInstance} from "class-transformer";

export interface ClassConstructor {
    new(...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

class SerializeInterceptor implements NestInterceptor {
    constructor(private interceptorDto: ClassConstructor) {

    }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        return handler.handle().pipe(
            map((data: any) => {
                return plainToInstance(this.interceptorDto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }

}