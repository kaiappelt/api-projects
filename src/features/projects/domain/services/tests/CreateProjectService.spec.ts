import 'reflect-metadata';
import RedisCache from '@core/infra/repositories/CacheRepository';
import FakeProjectsRepository from '@features/projects/domain/repositories/fakes/FakeProjectsRepository';
import FakeUsersRepository from '@features/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@core/domain/errors/AppError';
import CreateProjectsService from '../CreateProjectService';
import { v4 as uuidv4 } from 'uuid';

let fakeProjectRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let redisCache: RedisCache;
let createProject: CreateProjectsService;

describe("CreateProject", () => {
    beforeEach(() => {
        fakeProjectRepository = new FakeProjectsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        redisCache = new RedisCache();

        createProject = new CreateProjectsService(
            fakeProjectRepository,
            fakeUsersRepository,
            redisCache
        );
    });

    it("Deve cadastrar um novo projeto", async () => {
       // Cria um novo usuário para poder cadastrar um projeto 
        const user = await fakeUsersRepository.create({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456"
        });

        const project = await createProject.execute({
            user_id: user.id,
            name: "test project",
            description: "test project description",
        });
        
        expect(project).toHaveProperty("id");
    });

    it("Não deve criar projetos de um projeto que não existe", async () => {
        expect(
            createProject.execute({
                user_id: uuidv4(),
                name: "test project",
                description: "test project description"
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
})