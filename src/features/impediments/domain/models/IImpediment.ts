import { IProject } from "@features/projects/domain/models/IProject";
import { IProjectsRepository } from "@features/projects/domain/repositories/IProjectsRepository";

export interface IImpediment {
  id: string;
  project_id: string;
  name: string;
  description: string;
  active: boolean;

  project: IProject;
  projects?: IProject;

  created_at: Date;
  updated_at: Date;
}
