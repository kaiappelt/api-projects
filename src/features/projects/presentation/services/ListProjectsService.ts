import { inject, injectable } from "tsyringe";
import { IProject } from "../../domain/models/IProject";
import { IProjectsRepository } from "../../domain/repositories/IProjectsRepository";


@injectable()
class ListProjectsService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository
  ) {}

  public async execute(): Promise<IProject[]> {
    const projects = await this.projectsRepository.findAll();

    return projects;
  }
}

export default ListProjectsService;
