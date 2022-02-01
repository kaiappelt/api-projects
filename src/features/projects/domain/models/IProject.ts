import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import { IUser } from "@features/users/domain/models/IUser";

export interface IProject {
  id: string;
  user_id: string;
  name: string;
  description: string;

  user: IUser;
  impediment: IImpediment[];

  created_at: Date;
  updated_at: Date;
}
