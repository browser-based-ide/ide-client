export interface IFile {
	id: number;
	language: string;
	code: string;
	title?: string;
	question?: string;
	label?: string;
	output?: string;
	userId: number;
	createdAt: string;
	updatedAt: string;
}
