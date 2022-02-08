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

  // CRIA CHAVE DO CACHE
  public async execute(): Promise<IImpediment[]> {
    // VERIFICA SE O CACHE EXISTE
    let impediments = await 
    this.redisCache.recover<IImpediment[]>(
      "api-projects-IMPEDIMENTS-LIST"
      );

      // SE O CACHE NÃO EXISTIR, FAZ A CONSULTA NO BANCO
    if(!impediments){
      impediments = await this.impedimentsRepository.findAll();

      // SALVA OS DADOS NO CACHE
      await this.redisCache.save("api-projects-IMPEDIMENTS-LIST", impediments);
    }
    // RETORNA OS DADOS VINDOS DO CACHE OU DO BANCO
    return impediments;
  }
}

export default ListImpedimentsService;
