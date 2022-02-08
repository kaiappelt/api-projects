import RedisCache from "@core/infra/repositories/CacheRepository";
import AppError from "src/core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IProject } from "../models/IProject";
import { IUpdateProject } from "../models/IUpdateProject";
import { IProjectsRepository } from "../repositories/IProjectsRepository";

@injectable()
class UpdateProjectService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
    private redisCache:RedisCache
  ) {}

  public async execute({
    id,
    name,
    description,
  
  }: IUpdateProject): Promise<IProject> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError("Registro não encontrado", 404);
    }
    
    await this.redisCache.invalidate("api-projects-PROJECTS-LIST");

    project.name = name;
    project.description = description;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
