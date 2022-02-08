import RedisCache from "@core/infra/repositories/CacheRepository";
import AppError from "src/core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IDeleteProject } from "../models/IDeleteProject";
import { IProjectsRepository } from "../repositories/IProjectsRepository";


@injectable()
class DeleteProjectService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
    private redisCache:RedisCache
  ) {}

  public async execute({ id }: IDeleteProject): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError("Registro não encontrado", 404);
    }
    
    await this.redisCache.invalidate("api-projects-PROJECTS-LIST");

    await this.projectsRepository.remove(project);
  }
}

export default DeleteProjectService;
