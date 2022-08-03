import {Body, Controller, Get, Param, Post, NotFoundException} from '@nestjs/common';
import {MessagesService} from "./messages.service";
import {CreateMessageDto} from "./dto/create-message.dto";

@Controller('messages')
export class MessagesController {
    constructor(private service: MessagesService) {

    }

    @Get()
    list() {
        return this.service.all()
    }

    @Post()
    store(@Body() body: CreateMessageDto) {
        return this.service.create(body.content)
    }

    @Get('/:id')
    async show(@Param('id') id: string) {
        let message = await this.service.findById(parseFloat(id))

        if (!message) {
            throw new NotFoundException('Message not found')
        }
        return message;
    }
}
