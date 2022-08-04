import {Test} from '@nestjs/testing';
import {AuthService} from './auth.service';
import {UsersService} from "./users.service";
import {User} from "./user.entity";
import {BadRequestException, UnauthorizedException} from "@nestjs/common";

describe('AuthService', () => {
    let service = AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        //create a fake copy of the dependencies of the service
        let users: User[] = [];

        fakeUserService = {
            findAllByEmail: (email) => {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },
            create: (email: string, password: string) => {
                const user = {id: Math.floor(Math.random() * 999999), email, password} as User
                users.push(user)
                return Promise.resolve(user)
            }
        }

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ]
        }).compile();

        service = module.get(AuthService);

    })

    it('should create an instance of the auth service', async () => {
        expect(service).toBeDefined();
    })

    it('should create a new user with a salted and hashed password', async function () {
        const password = 'password';
        // @ts-ignore
        const user = await service.register('asd@asd.com', password);
        expect(user.password).not.toEqual(password);

        const [salt, hash] = user.password.split('.')

        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('should throw an error if user registers with an email that is in use!', async function () {
        const email = 'email@email.com'
        // @ts-ignore
        await service.register(email, 'password')
        // @ts-ignore
        await expect(service.register(email, 'password')).rejects.toThrow(
            BadRequestException
        )
    });

    it('should throw if register is called with an unused email', async function () {
        // @ts-ignore
        await expect(service.login('asd@asd.com', 'password')).rejects.toThrow(
            UnauthorizedException
        );
    });

    it('should throw if an invalid password is provided', async function () {
        const email = 'email@email.com'
        // @ts-ignore
        await service.register(email, 'password')
        // @ts-ignore
        await expect(service.login(email, 'badPassword')).rejects.toThrow(
            UnauthorizedException
        )
    });

    it('should returns a user if the credentials are correct', async function () {
        const email = 'email@emai.com';
        const password = 'password';

        // @ts-ignore
        await service.register(email, password);
        // @ts-ignore
        const userLogin = await service.login(email, password)

        expect(userLogin).toBeDefined()
    });
})

