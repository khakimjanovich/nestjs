import {UsersController} from "./users.controller";
import {Test, TestingModule} from "@nestjs/testing";
import {AuthService} from "./auth.service";
import {UsersService} from "./users.service";
import {User} from "./user.entity";

describe('UsersController', () => {
    let controller: UsersController;
    let fakeAuthService: Partial<AuthService>;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {

        let users: User[] = [];


        fakeAuthService = {
            // async register(email: string, password: string): Promise<User> {
            //     const user = {id: Math.floor(Math.random() * 999999), email, password} as User
            //
            // },
            async login(email: string, password: string): Promise<User> {
                return Promise.resolve({id: 1, email, password} as User)
            }
        }

        fakeUserService = {
            findAllByEmail(email: string): Promise<User[]> {
                const filteredUsers = users.filter(user => user.email === email);
                return Promise.resolve(filteredUsers);
            },

            async findOneById(id: number): Promise<User> {
                return Promise.resolve(users[id])
            },

            //     async update(id: number, attrs: Partial<User>): Promise<User> {
            //
            //     },
            //
            //     async remove(id: number): Promise<User> {
            //     },
        }

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: AuthService,
                    useValue: fakeAuthService
                },
                {
                    provide: UsersService,
                    useValue: fakeUserService,
                }
            ]
        }).compile()

        controller = module.get<UsersController>(UsersController);
    })

    it('should create an instance of the controller', async () => {
        expect(controller).toBeDefined();
    })

    it('should returns a list of users with given email finAllUsers', async function () {
        let email = 'email@email.com';


        const users = await controller.findAllUsers(email)
        expect(users.length).toEqual(0)
    });

    // it('should return a user with given id findUser', async function () {
    //     const user = await controller.findUser('1')
    //     expect(user).toBeDefined()
    // });

    // it('should throw an error if user with given id is not found', async function () {
    //
    //     await expect(controller.findUser('1')).rejects.toThrow(
    //         NotFoundException
    //     )
    // });

    it('should log user in and updates session object and returns user object', async function () {
        const session = {userId: 2}
        const user = await controller.login({email: 'admin@admin.com', password: 'password'}, session)
        expect(user.id).toEqual(1)
        expect(session.userId).toEqual(1)
    });
})