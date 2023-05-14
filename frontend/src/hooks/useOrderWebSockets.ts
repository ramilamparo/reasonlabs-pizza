import { useCallback, useEffect, useRef } from "react";
import socketIO from "socket.io-client";
import { API_URL } from "../config/env";
import { OrderModel } from "../models/order.model";

export const useOrderWebSockets = (callback: (order: OrderModel) => void) => {
	const callbackRef = useRef(callback);

	const socket = useRef(socketIO(API_URL));

	const handleOrderUpdate = useCallback((order: OrderModel) => {
		callbackRef.current(order);
	}, []);

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	useEffect(() => {
		const client = socket.current;
		client.on("order:update", handleOrderUpdate);
		return () => void client.off("order:update", handleOrderUpdate);
	}, [handleOrderUpdate]);
};
