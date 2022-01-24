import ShowProjectService from "src/features/projects/presentation/services/ShowProjectService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class ShowProjectController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProject = container.resolve(ShowProjectService);

    const project = await showProject.execute({ id });

    return response.json(project);
  }
}
