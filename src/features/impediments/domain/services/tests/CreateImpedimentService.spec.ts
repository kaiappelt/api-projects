import RedisCache from '@core/infra/repositories/CacheRepository';
import FakeImpedimentsRepository from '@features/impediments/domain/repositories/fakes/FakeImpedimentsRepository';
import FakeProjectsRepository from '@features/projects/domain/repositories/fakes/FakeProjectsRepository';
import 'reflect-metadata';
import CreateImpedimentService from '../CreateImpedimentService';
import { v4 as uuidv4 } from 'uuid';
import FakeUsersRepository from '@features/users/domain/repositories/fakes/FakeUsersRepository';
import AppError from '@core/domain/errors/AppError';

let fakeImpedimentsRepository: FakeImpedimentsRepository;
let fakeProjectRepository: FakeProjectsRepository;
let fakeUsersRepository: FakeUsersRepository;
let redisCache: RedisCache;
let createImpediment: CreateImpedimentService;

describe("CreateImpediment", () => {
    beforeEach(() => {
        fakeImpedimentsRepository = new FakeImpedimentsRepository();
        fakeProjectRepository = new FakeProjectsRepository();
        fakeUsersRepository = new FakeUsersRepository();
        redisCache = new RedisCache();

        createImpediment = new CreateImpedimentService(
            fakeImpedimentsRepository, 
            fakeProjectRepository,
            redisCache
        );
    });

    it("Deve cadastrar um novo impedimento", async () => {
       // Cria um novo usuário para poder cadastrar um projeto 
        const user = await fakeUsersRepository.create({
            name: "kai",
            email: "kai@gmail.com",
            password: "123456"
        });

        // Cria um novo projeto para poder cadastrar um impedimento
        const project = await fakeProjectRepository.create({
            user_id: user.id,
            name: "test project",
            description: "test project description",
        });

        const impediment = await createImpediment.execute({
            project_id: project.id,
            name: "test impediment",
            description: "test impediment description",
            active: true,
        });
        
        expect(impediment).toHaveProperty("id");
    });

    it("Não deve criar impedimentos de um projeto que não existe", async () => {
        expect(
            createImpediment.execute({
                project_id: uuidv4(),
                name: "test impediment",
                description: "test impediment description",
                active: true,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
})