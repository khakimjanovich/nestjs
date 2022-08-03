import {readFile, writeFile} from "fs/promises";
import {Injectable} from "@nestjs/common";


@Injectable()
export class MessagesRepository {
    async findById(id: number) {
        const messages = await this.getMessages()
        return messages[id]
    }

    async all() {
        return this.getMessages();
    }

    async create(message: string) {
        let messages = await this.getMessages();
        const id = Math.floor(Math.random() * 999)
        messages[id] = {id, content: message}
        await writeFile('messages.json', JSON.stringify(messages))

        return {id, content: message}
    }

    private async getMessages() {
        const content = await readFile('messages.json', 'utf-8');
        return JSON.parse(content)
    }
}