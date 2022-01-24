
import UpdateProjectService from "src/features/projects/presentation/services/UpdateMessageService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../../core/presentation/contracts/IController";

export default class UpdateProjectsController implements IController{
  public async run(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;
    const { id } = request.params;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      id,
      name,
      description,
    });

    return response.json(project);
  }
}
