export interface LogModel<State extends string = string> {
	id: string;
	state: State;
	moduleId: number;
	module: string;
}
