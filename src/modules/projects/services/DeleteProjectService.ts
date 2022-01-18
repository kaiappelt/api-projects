import AppError from "@shared/errors/AppError";
import { injectable, inject } from "tsyringe";
import { IDeleteProject } from "../domain/models/IDeleteProject";
import { IProjectsRepository } from "../domain/repositories/IProjectsRepository";


@injectable()
class DeleteProjectService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute({ id }: IDeleteProject): Promise<void> {
    const project = await this.projectsRepository.findById(id);

    if (!project) {
      throw new AppError("Registro não encontrado", 400);
    }

    await this.projectsRepository.remove(project);
  }
}

export default DeleteProjectService;
