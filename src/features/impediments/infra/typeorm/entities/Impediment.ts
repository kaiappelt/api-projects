import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import Projects from "@features/projects/infra/typeorm/entities/Project";
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
//  Representa as tabelas
@Entity("impediments")
class Impediment implements IImpediment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  project_id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  active: boolean;

  @ManyToOne(() => Projects, project => project.impediment)
  @JoinColumn({name:"project_id"})
  project: Projects;
  
  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Impediment;
