import RedisCache from "@core/infra/repositories/CacheRepository";
import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import { IUpdateImpediment } from "@features/impediments/domain/models/IUpdateImpediment";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import AppError from "src/core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
class UpdateImpedimentService {
  constructor(
    @inject("ImpedimentsRepository")
    private impedimentsRepository: IImpedimentsRepository,
    private redisCache:RedisCache
  ) {}

  public async execute({
    id,
    name,
    description,
    active,
  
  }: IUpdateImpediment): Promise<IImpediment> {
    const impediment = await this.impedimentsRepository.findById(id);

    if (!impediment) {
      throw new AppError("Registro não encontrado", 404);
    }
    
    await this.redisCache.invalidate("api-projects-IMPEDIMENTS-LIST");

    impediment.name = name;
    impediment.description = description;
    impediment.active = active;

    await this.impedimentsRepository.save(impediment);

    return impediment;
  }
}

export default UpdateImpedimentService;
