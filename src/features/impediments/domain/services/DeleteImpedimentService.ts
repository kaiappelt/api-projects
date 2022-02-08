import RedisCache from "@core/infra/repositories/CacheRepository";
import { IDeleteImpediment } from "@features/impediments/domain/models/IDeleteImpediment";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import AppError from "src/core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";

@injectable()
class DeleteImpedimentService {
  constructor(
    @inject("ImpedimentsRepository")
    private impedimentsRepository: IImpedimentsRepository,
    private redisCache:RedisCache
  ) {}

  public async execute({ id }: IDeleteImpediment): Promise<void> {
    const impediment = await this.impedimentsRepository.findById(id);

    if (!impediment) {
      throw new AppError("Registro não encontrado", 404);
    }
    
    await this.redisCache.invalidate("api-projects-IMPEDIMENTS-LIST");

    await this.impedimentsRepository.remove(impediment);
  }
}

export default DeleteImpedimentService;
