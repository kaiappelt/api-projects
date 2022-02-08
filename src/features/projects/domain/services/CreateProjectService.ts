import { IUserRepository } from "@features/users/domain/repositories/IUserRepository";
import AppError from "@core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICreateProjects } from "../models/ICreateProjects";
import { IProject } from "@features/projects/domain/models/IProject";
import { IProjectsRepository } from "../repositories/IProjectsRepository";
import RedisCache from "@core/infra/repositories/CacheRepository";

@injectable()
class CreateProjectsService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
     
    @inject("UsersRepository")
    private usersRepository: IUserRepository,

    private redisCache:RedisCache
  ) {}

  public async execute({
    user_id,
    name,
    description,
  }: ICreateProjects): Promise<IProject> {
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new AppError("Usuário não existe", 400);
    }

    // RESETA CACHE "ALTERAÇÕES"
    await this.redisCache.invalidate("api-projects-PROJECTS-LIST");

    const project = await this.projectsRepository.create({
      user_id,
      name,
      description,
    });

    return project;
  }
}

export default CreateProjectsService;
