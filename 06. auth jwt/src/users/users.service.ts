import {Injectable} from '@nestjs/common';

export type User = {
    id: number;
    name: string;
    username: string;
    password: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [
        {
            id: 1,
            name: 'randomName',
            username: 'randomUsername',
            password: 'password'
        },
        {
            id: 2,
            name: 'randomName2',
            username: 'randomUsername2',
            password: 'password'
        },
        {
            id: 3,
            name: 'randomName3',
            username: 'randomUsername3',
            password: 'password'
        },
        {
            id: 4,
            name: 'randomName4',
            username: 'randomUsername4',
            password: 'password'
        },
    ]

    async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async findById(id: number) {
        return this.users.find(user => user.id === id);
    }


}
