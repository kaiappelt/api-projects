import RedisCache from "@core/infra/repositories/CacheRepository";
import { inject, injectable } from "tsyringe";
import { IProject } from "../../domain/models/IProject";
import { IProjectsRepository } from "../../domain/repositories/IProjectsRepository";
@injectable()
class ListProjectsService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
    private redisCache:RedisCache
  ) {}

  public async execute(): Promise<IProject[]> {
    let projects = await this.redisCache.recover<IProject[]>(
      "api-projects-PROJECTS-LIST"
    );

    if(!projects){
      projects = await this.projectsRepository.findAll();

      await this.redisCache.save("api-projects-PROJECTS-LIST", projects);
    }
    
    return projects;
  }
}

export default ListProjectsService;
