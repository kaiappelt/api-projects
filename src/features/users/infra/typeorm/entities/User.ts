import { IProject } from "src/features/projects/domain/models/IProject";
import Projects from "src/features/projects/infra/typeorm/entities/Project";
import { IUser } from "src/features/users/domain/models/IUser";
import {
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   Entity,
   PrimaryGeneratedColumn,
   OneToMany,
} from "typeorm";

@Entity("users")
class User implements IUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    // @OneToMany(() => Projects, projects => projects.user_id)
    // projects: Projects[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;