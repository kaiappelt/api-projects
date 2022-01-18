import { container } from "tsyringe";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IProjectsRepository } from "@modules/projects/domain/repositories/IProjectsRepository";
import ProjectsRepository from "@modules/projects/infra/typeorm/repositories/ProjectsRepository";

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IProjectsRepository>(
  "ProjectsRepository",
  ProjectsRepository
);


