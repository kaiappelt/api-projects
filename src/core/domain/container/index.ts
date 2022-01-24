import { container } from "tsyringe";
import { IUserRepository } from "src/features/users/domain/repositories/IUserRepository";
import UsersRepository from "src/features/users/infra/typeorm/repositories/UsersRepository";
import { IProjectsRepository } from "src/features/projects/domain/repositories/IProjectsRepository";
import ProjectsRepository from "src/features/projects/infra/typeorm/repositories/ProjectsRepository";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IProjectsRepository>(
  "ProjectsRepository",
  ProjectsRepository
);


