import {Injectable} from '@nestjs/common';
import {MessagesRepository} from "./messages.repository";

@Injectable()
export class MessagesService {
    constructor(private messagesRepository: MessagesRepository) {
    }

    all() {
        return this.messagesRepository.all();
    }

    create(message: string) {
        return this.messagesRepository.create(message)
    }


    findById(id: number) {
        return this.messagesRepository.findById(id)
    }
}
