import { container } from "tsyringe";
import { IUserRepository } from "src/features/users/domain/repositories/IUserRepository";
import UsersRepository from "src/features/users/infra/typeorm/repositories/UsersRepository";
import { IProjectsRepository } from "src/features/projects/domain/repositories/IProjectsRepository";
import ProjectsRepository from "src/features/projects/infra/typeorm/repositories/ProjectsRepository";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import ImpedimentsRepository from "@features/impediments/infra/typeorm/repositories/ImpedimentsRepository";

// CONFIGURAÇÕES DA INJEÇÃO DE DEPENDENCIAS
container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IProjectsRepository>(
  "ProjectsRepository",
  ProjectsRepository
);

container.registerSingleton<IImpedimentsRepository>(
  "ImpedimentsRepository",
  ImpedimentsRepository
);


