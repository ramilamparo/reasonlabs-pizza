import { LogModel } from "./log.model";
import { PizzaModel } from "./pizza.model";

export interface OrderModel {
	id: number;
	pizza: PizzaModel;
	logs: LogModel<OrderStatus>[];
}

export type OrderStatus =
	| "PENDING"
	| "DOUGH_START"
	| "DOUGH_END"
	| "TOPPING_START"
	| "TOPPING_END"
	| "OVEN_START"
	| "OVEN_END"
	| "WAITER_START"
	| "WAITER_END";
