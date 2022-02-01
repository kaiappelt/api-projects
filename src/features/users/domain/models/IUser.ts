import { IProject } from "@features/projects/domain/models/IProject";

export interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;

    projects: IProject[];

    created_at: Date;    
    updated_at: Date;
}