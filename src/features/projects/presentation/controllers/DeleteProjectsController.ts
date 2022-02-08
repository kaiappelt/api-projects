import DeleteProjectService from "@features/projects/domain/services/DeleteProjectService";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../../core/presentation/contracts/IController";

export default class DeleteProjectsController implements IController{
   public async run(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute({ id });

    return response.json([]);
  }
}
