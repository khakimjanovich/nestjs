import { PartialType } from '@nestjs/swagger';
import { CreatePermissionObjectDto } from './create-permission-object.dto';

export class UpdatePermissionObjectDto extends PartialType(CreatePermissionObjectDto) {}
