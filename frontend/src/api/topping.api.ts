import axios from "axios";
import { API_URL } from "../config/env";
import { ToppingModel } from "../models/topping.model";

export const createTopping = (name: string) =>
	axios.post<ToppingModel>(`${API_URL}/toppings`, { name });
