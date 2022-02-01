import { ICreateProjects } from "../models/ICreateProjects";
import { IProject } from "../models/IProject";

// INTERFACE DO REPOSITORIO
export interface IProjectsRepository {
  findAll(): Promise<IProject[]>;
  findById(id: string): Promise<IProject | undefined>;
  create(data: ICreateProjects): Promise<IProject>;
  save(project: IProject): Promise<IProject>;
  remove(project: IProject): Promise<void>;
}
