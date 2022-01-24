import { IUser } from "src/features/users/domain/models/IUser";

export interface IUserAuthenticated {
  user: IUser;
  token: string;
}
