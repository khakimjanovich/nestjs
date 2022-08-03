import {Module} from '@nestjs/common';
import {UsersModule} from "../modules/users/users.module";
import {ReportsModule} from "../modules/reports/reports.module";

@Module({
    imports: [UsersModule, ReportsModule],
    controllers: [],
    providers: [],
})
export class AppModule {
}
