import {Injectable} from '@nestjs/common';

@Injectable()
export class MessagesService {
    list() {
        return 'the collection of the messages';
    }

    store(body) {
        return body;
    }


    find(id) {
        return id
    }
}
