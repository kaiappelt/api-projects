
import CreateProjectsService from "@modules/projects/services/CreateProjectService";
import DeleteProjectService from "@modules/projects/services/DeleteProjectService";
import ListProjectsService from "@modules/projects/services/ListprojectsService";
import ShowProjectService from "@modules/projects/services/ShowProjectService";
import UpdateProjectService from "@modules/projects/services/UpdateMessageService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class ProjectsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProjects = container.resolve(ListProjectsService);

    const projects = await listProjects.execute();

    return response.json(projects);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProject = container.resolve(ShowProjectService);

    const project = await showProject.execute({ id });

    return response.json(project);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { user_id, name, description } = request.body;

    const createProjects = container.resolve(CreateProjectsService);

    const projects = await createProjects.execute({
      user_id,
      name,
      description,
    });

    return response.json(projects);
  }

  public async update(request: Request, response: Response): Promise<Response> {
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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute({ id });

    return response.json([]);
  }
}
