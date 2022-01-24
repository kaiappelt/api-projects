import { IUserRepository } from "src/features/users/domain/repositories/IUserRepository";
import AppError from "src/core/domain/errors/AppError";
import { injectable, inject } from "tsyringe";
import { ICreateProjects } from "../../domain/models/ICreateProjects";
import { IProject } from "../../domain/models/IProject";
import { IProjectsRepository } from "../../domain/repositories/IProjectsRepository";

@injectable()
class CreateProjectsService {
  constructor(
    @inject("ProjectsRepository")
    private projectsRepository: IProjectsRepository,
     
    @inject("UsersRepository")
    private usersRepository: IUserRepository
  ) {}

  public async execute({
    user_id,
    name,
    description,
  }: ICreateProjects): Promise<IProject> {
    const user = await this.usersRepository.findById(user_id);

    if(!user){
      throw new AppError("Usuário não existe", 400);
    }

    const project = await this.projectsRepository.create({
      user_id,
      name,
      description,
    });

    return project;
  }
}

export default CreateProjectsService;
