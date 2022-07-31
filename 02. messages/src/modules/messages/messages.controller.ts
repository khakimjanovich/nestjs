import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {MessagesService} from "./messages.service";
import {CreateMessageDto} from "./dto/create-message.dto";

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {
    }

    @Get()
    list() {
        return this.service.list()
    }

    @Post()
    store(@Body() body: CreateMessageDto) {
        return this.service.store(body)
    }

    @Get('/:id')
    show(@Param('id') id: string) {
        return this.service.find(id)
    }
}
