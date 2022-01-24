
import CreateProjectsService from "src/features/projects/presentation/services/CreateProjectService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class CreateProjectsController implements IController{
   public async run(request: Request, response: Response): Promise<Response> {
    const { user_id, name, description } = request.body;

    const createProjects = container.resolve(CreateProjectsService);

    const projects = await createProjects.execute({
      user_id,
      name,
      description,
    });

    return response.json(projects);
  }

}