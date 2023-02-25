export interface ISession {
	id: number;
	author_id: number;
	startTime: string;
	endTime?: string;
	note?: string;
	createdAt: string;
	updatedAt: string;
}
