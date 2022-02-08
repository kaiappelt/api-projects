import 'reflect-metadata';
import CreateUserService from '../CreateUserService';
import FakeHashProvider from '@features/users/domain/providers/hashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@features/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@core/domain/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe("CreateUser", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();

        createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    });

    it("Deve cadastrar um novo usuário", async () => {
        const user = await createUser.execute({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456"
        });
        expect(user).toHaveProperty("id");
    });

    it("Não deve criar usuários com o mesmo e-mail", async () => {
        await createUser.execute({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456"
        });

        expect(
            createUser.execute({
                    name: "kai",
                    email: "kai@gmail.com",
                    password: "123456"
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});