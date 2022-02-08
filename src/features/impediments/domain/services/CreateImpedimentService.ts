import AppError from "@core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import RedisCache from "@core/infra/repositories/CacheRepository";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import { IProjectsRepository } from "@features/projects/domain/repositories/IProjectsRepository";
import { ICreateImpediment } from "@features/impediments/domain/models/ICreateImpediment";
import { IImpediment } from "@features/impediments/domain/models/IImpediment";

@injectable()
class CreateImpedimentService {
  constructor(
    @inject("ImpedimentsRepository")
    private impedimentsRepository: IImpedimentsRepository,
     
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,

    private redisCache:RedisCache
  ) {}

  public async execute({
    project_id,
    name,
    description,
    active,
  }: ICreateImpediment): Promise<IImpediment> {
    const project = await this.projectsRepository.findById(project_id);

    if(!project){
      throw new AppError("Projeto não existe", 404);
    }

    // RESETA O CACHE PARA MANTÊ-LO ATUALIZADO
    await this.redisCache.invalidate("api-projects-IMPEDIMENTS-LIST");

    const impediment = await this.impedimentsRepository.create({
      project_id,
      name,
      description,
      active,
    });

    return impediment;
  }
}

export default CreateImpedimentService;
