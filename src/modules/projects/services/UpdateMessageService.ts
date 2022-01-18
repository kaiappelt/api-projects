import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IProject } from "../domain/models/IProject";
import { IUpdateProject } from "../domain/models/IUpdateProject";
import { IProjectsRepository } from "../domain/repositories/IProjectsRepository";


@injectable()
class UpdateProjectService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({
    id,
    name,
    description,
  
  }: IUpdateProject): Promise<IProject> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError("Registro não encontrado", 400);
    }

    project.name = name;
    project.description = description;

    await this.projectsRepository.save(project);

    return project;
  }
}

export default UpdateProjectService;
