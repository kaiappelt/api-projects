import 'reflect-metadata';
import FakeUsersRepository from '@features/users/domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@features/users/domain/providers/hashProvider/fakes/FakeHashProvider';
import AppError from '@core/domain/errors/AppError';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createSession: CreateSessionsService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createSession = new CreateSessionsService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('Deve fazer a autenticação de um usuário', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Kainara Appelt',
      email: 'kaiappelt53@gmail.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'kaiappelt53@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('Não deve autenticar com um usuário inexistente', async () => {
    expect(
      createSession.execute({
        email: 'kaiappelt53@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve autenticar quando um usuário fornece uma senha errada', async () => {
    await fakeUsersRepository.create({
        name: 'Kainara Appelt',
        email: 'kaiappelt53@gmail.com',
        password: '123456',
    });

    expect(
      createSession.execute({
        email: 'kaiappelt53@gmail.com',
        password: '236589',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});