import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import { IShowImpediment } from "@features/impediments/domain/models/IShowImpediment";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import AppError from "src/core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class ShowImpedimentService {
  constructor(
    @inject("ImpedimentsRepository")
    private impedimentsRepository: IImpedimentsRepository,
  ) {}

  public async execute({ id }: IShowImpediment): Promise<IImpediment | undefined> {
    const impediment = await this.impedimentsRepository.findById(id);

    if (!impediment) {
      throw new AppError("Registro não encontrado", 404);
    }
    
    return impediment;
  }
}

export default ShowImpedimentService;