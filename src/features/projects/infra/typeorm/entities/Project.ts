import { IProject } from "src/features/projects/domain/models/IProject";
import User from "src/features/users/infra/typeorm/entities/User";
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
//  Representa as tabelas
@Entity("projects")
class Projects implements IProject {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  // @ManyToOne(() => User, user => user.projects)
  // user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Projects;