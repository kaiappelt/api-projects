import { ICreateImpediment } from "@features/impediments/domain/models/ICreateImpediment";
import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import { getRepository, Repository } from "typeorm";
import Impediment from "../entities/Impediment";

class ImpedimentsRepository implements IImpedimentsRepository {
  private ormRepository: Repository<Impediment>;

  constructor() {
    this.ormRepository = getRepository(Impediment);
  } 

  public async findAll(): Promise<IImpediment[]> {
    const impediments = await this.ormRepository.find();

    return impediments;
  }

  public async findById(id: string): Promise<IImpediment | undefined> {
    const impediment = this.ormRepository.findOne(id);

    return impediment;
  }

  public async create({
    project_id,
    name,
    description,
    active,
  }: ICreateImpediment): Promise<IImpediment> {
    const impediment = this.ormRepository.create({
      project_id,
      name,
      description,
      active
    });

    await this.ormRepository.save(impediment);

    return impediment;
  }

  public async save(impediment: IImpediment): Promise<IImpediment> {
    await this.ormRepository.save(impediment);

    return impediment;
  }

  public async remove(impediment: IImpediment): Promise<void> {
    await this.ormRepository.remove(impediment);
  }
}

export default ImpedimentsRepository;
