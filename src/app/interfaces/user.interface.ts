import { IFile } from "./file.interface";
import { ISession } from "./session.interface";

export interface IUser {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	active: boolean;
	files: IFile[];
	sessions: ISession[];
	createdAt: string;
	updatedAt: string;
}
