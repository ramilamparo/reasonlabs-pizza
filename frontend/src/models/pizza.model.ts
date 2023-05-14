import { ToppingModel } from "./topping.model";

export interface PizzaModel {
	id: string;
	toppings: ToppingModel[];
}
