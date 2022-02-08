import { ICreateImpediment } from "@features/impediments/domain/models/ICreateImpediment";
import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import { IImpedimentsRepository } from "@features/impediments/domain/repositories/IImpedimentsRepository";
import Impediment from "@features/impediments/infra/typeorm/entities/Impediment";
import { v4 as uuidv4 } from 'uuid';

class FakeImpedimentsRepository implements IImpedimentsRepository {
    private impediments: Impediment[] = [];

  public async findAll(): Promise<any[]> {
    return this.impediments;
  }

  public async findById(id: string): Promise<IImpediment | undefined> {
    const impediment = this.impediments.find(impediment => (impediment.id = id));

    return impediment;
  }

  public async create({
    project_id,
    name,
    description,
    active,
  }: ICreateImpediment): Promise<IImpediment> {
   const impediment = new Impediment();

   impediment.id = uuidv4();
   impediment.project_id = project_id;
   impediment.name = name;
   impediment.description = description;
   impediment.active = active;

   this.impediments.push(impediment);

   return impediment;
  }

  public async save(impediment: IImpediment): Promise<IImpediment> {
    const findIndex = this.impediments.findIndex(
        findImpediment => (findImpediment.id = impediment.id),
      );
  
      this.impediments[findIndex] = impediment;
  
      return impediment;
  }

  public async remove(impediment: IImpediment): Promise<void> {
    const findIndex = this.impediments.findIndex(
        findImpediment => (findImpediment.id = impediment.id),
      );
  
      this.impediments.splice(findIndex, 1);
  }
}

export default FakeImpedimentsRepository;
