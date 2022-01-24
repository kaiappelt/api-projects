import ListProjectsService from "../../../../../features/projects/presentation/services/ListProjectsService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class ListProjectsController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const listProjects = container.resolve(ListProjectsService);

    const projects = await listProjects.execute();

    return response.json(projects);
  }
}
