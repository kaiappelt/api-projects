import { IImpediment } from "@features/impediments/domain/models/IImpediment";
import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
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

  // @ManyToOne(() => User, user => user.projects)
  // user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Impediment;
