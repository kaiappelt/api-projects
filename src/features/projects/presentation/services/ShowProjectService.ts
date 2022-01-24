import AppError from "src/core/domain/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IProject } from "../../domain/models/IProject";
import { IShowProject } from "../../domain/models/IShowProject";
import { IProjectsRepository } from "../../domain/repositories/IProjectsRepository";

@injectable()
class ShowProjectService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ id }: IShowProject): Promise<IProject | undefined> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError("Registro não encontrado", 400);
    }
    
    return project;
  }
}

export default ShowProjectService;