import { IUser } from "./user.interface";

export interface IAuthInfo {
	token: string;
	user: IUser;
}
