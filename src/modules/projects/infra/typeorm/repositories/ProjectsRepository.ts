import { ICreateProjects } from "@modules/projects/domain/models/ICreateProjects";
import { IProjectsRepository } from "@modules/projects/domain/repositories/IProjectsRepository";
import { getRepository, Repository } from "typeorm";
import Projects from "../entities/Project";

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Projects>;

  constructor() {
    this.ormRepository = getRepository(Projects);
  }

  public async findAll(): Promise<Projects[]> {
    const projects = await this.ormRepository.find();

    return projects;
  }

  public async findById(id: string): Promise<Projects | undefined> {
    const projects = this.ormRepository.findOne(id);

    return projects;
  }

  public async create({
    user_id,
    name,
    description,
  }: ICreateProjects): Promise<Projects> {
    const projects = this.ormRepository.create({
      user_id,
      name,
      description,
    });

    await this.ormRepository.save(projects);

    return projects;
  }

  public async save(projects: Projects): Promise<Projects> {
    await this.ormRepository.save(projects);

    return projects;
  }

  public async remove(projects: Projects): Promise<void> {
    await this.ormRepository.remove(projects);
  }
}

export default ProjectsRepository;
