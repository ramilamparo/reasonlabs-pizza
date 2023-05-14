import { useEffect, useRef } from "react";
import socketIO from "socket.io-client";
import { API_URL } from "../config/env";

export const useOrderWebSockets = () => {
	const socket = useRef(socketIO(API_URL));

	useEffect(() => {
		const handler = (data: unknown) => {
			console.log(data);
		};
		socket.current.on("order:update", handler);
		return () => void socket.current.off("order:update", handler);
	}, []);
};
