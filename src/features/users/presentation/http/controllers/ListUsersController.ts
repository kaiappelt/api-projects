import { Request, Response } from "express";
import CreateUserService from "src/features/users/presentation/services/CreateUserService";
import ListUsersService from "src/features/users/presentation/services/ListUsersService";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class ListUsersController implements IController {
  public async run(request: Request, response: Response): Promise<Response> {
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute();

    return response.json(users);
  }
}
