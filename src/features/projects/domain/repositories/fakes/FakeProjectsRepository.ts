import { ICreateProjects } from "@features/projects/domain/models/ICreateProjects";
import { IProjectsRepository } from "../IProjectsRepository";
import Projects from "@features/projects/infra/typeorm/entities/Project";
import { v4 as uuidv4 } from 'uuid';
class FakeProjectsRepository implements IProjectsRepository {
  private projects: Projects[] = [];

  public async findAll(): Promise<Projects[]> {
    return this.projects;
  }

  public async findById(id: string): Promise<Projects | undefined> {
    const project = this.projects.find(project => (project.id = id));

    return project;
  }

  public async create({
    user_id,
    name,
    description,
  }: ICreateProjects): Promise<Projects> {
    const project = new Projects();

    project.id = uuidv4();
    project.user_id = user_id;
    project.name = name;
    project.description = description;

   this.projects.push(project);

   return project;
  }

  public async save(project: Projects): Promise<Projects> {
    const findIndex = this.projects.findIndex(
        findProject => (findProject.id = project.id),
      );
  
      this.projects[findIndex] = project;
  
      return project;
  }

  public async remove(project: Projects): Promise<void> {
    const findIndex = this.projects.findIndex(
        findProject => (findProject.id = project.id),
      );
  
      this.projects.splice(findIndex, 1); 
 }
}

export default FakeProjectsRepository;
