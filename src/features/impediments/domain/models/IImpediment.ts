import { IProject } from "@features/projects/domain/models/IProject";

export interface IImpediment {
  id: string;
  project_id: string;
  name: string;
  description: string;
  active: boolean;
  project: IProject;
  created_at: Date;
  updated_at: Date;
}
