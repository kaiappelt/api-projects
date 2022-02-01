import { ICreateImpediment } from "../models/ICreateImpediment";
import { IImpediment } from "../models/IImpediment";

// INTERFACE DO REPOSITORIO "ESQUELETO DOS METODOS"
export interface IImpedimentsRepository {
  findAll(): Promise<IImpediment[]>;
  findById(id: string): Promise<IImpediment | undefined>;
  create(data: ICreateImpediment): Promise<IImpediment>;
  save(impediment: IImpediment): Promise<IImpediment>;
  remove(impediment: IImpediment): Promise<void>;
}
