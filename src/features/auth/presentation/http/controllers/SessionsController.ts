
import { IController } from "../../../../../core/presentation/contracts/IController";
import { Request, Response } from "express";
import { container } from "tsyringe";
import CreateSessionsService from "../../services/CreateSessionsService";

// CONTROLLER DE LOGIN
export default class SessionsController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    // INVERSÃO DE DEPENDENCIA
    const createSession = container.resolve(CreateSessionsService);

    const user = await createSession.execute({
      email,
      password,
    });

    return response.json(user);
  }
}
