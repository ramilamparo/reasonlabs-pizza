import axios from "axios";
import { API_URL } from "../config/env";
import { OrderModel } from "../models/order.model";

export const createOrder = (toppingIds: Array<string | number>) =>
	axios.post<OrderModel>(`${API_URL}/orders`, { toppingIds });

export const getOrders = () => axios.get<OrderModel[]>(`${API_URL}/orders`);
