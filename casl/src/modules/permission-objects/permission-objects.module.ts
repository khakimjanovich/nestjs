import {Module} from '@nestjs/common';
import {PermissionObjectsService} from './permission-objects.service';
import {PermissionObjectsController} from './permission-objects.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {PermissionObject} from "./entities/permission-object.entity";

@Module({
    imports: [TypeOrmModule.forFeature([PermissionObject])],
    controllers: [PermissionObjectsController],
    providers: [PermissionObjectsService]
})
export class PermissionObjectsModule {
}
