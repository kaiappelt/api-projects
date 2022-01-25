import RedisCache from "@core/infra/repositories/CacheRepository";
import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListImpedimentsService {
  constructor(
    @inject("ImpedimentsRepository")
    private impedimentsRepository: IImpedimentsRepository,
    private redisCache:RedisCache
  ) {}

  public async execute(): Promise<IImpediment[]> {
    let impediments = await this.redisCache.recover<IImpediment[]>(
      "api-projects-IMPEDIMENTS-LIST"
    );

    if(!impediments){
      impediments = await this.impedimentsRepository.findAll();

      await this.redisCache.save("api-projects-IMPEDIMENTS-LIST", impediments);
    }
    
    return impediments;
  }
}

export default ListImpedimentsService;
