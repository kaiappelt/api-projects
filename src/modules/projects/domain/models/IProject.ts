import { IUser } from "@modules/users/domain/models/IUser";

export interface IProject {
  id: string;
  user_id: string;
  name: string;
  description: string;
  user: IUser;
  created_at: Date;
  updated_at: Date;
}
