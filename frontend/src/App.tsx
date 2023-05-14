import { useOrderWebSockets } from "./hooks/useOrderWebSockets";
import { Box, Container, CssBaseline, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "./redux";
import { upsert } from "./redux/order";
import { useCallback, useEffect } from "react";
import { getOrders } from "./api/order.api";
import { OrderModel } from "./models/order.model";
import { OrderList } from "./components/OrderList";

function App() {
	const dispatch = useAppDispatch();

	const orders = useAppSelector((state) => {
		return groupOrders(state.order.list);
	});

	const initializeOrders = useCallback(() => {
		getOrders().then(({ data: orders }) =>
			orders.forEach((order) => dispatch(upsert(order)))
		);
	}, [dispatch]);

	useOrderWebSockets((order) => {
		dispatch(upsert(order));
	});

	useEffect(() => {
		initializeOrders();
	}, [initializeOrders]);

	return (
		<>
			<CssBaseline />
			<Container sx={{ mt: 2 }} maxWidth="xl">
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Box
							component={OrderList}
							title="Pending"
							orders={orders.pending}
							sx={(theme) => ({
								maxHeight: `calc(100vh - ${theme.spacing(4)})`,
								overflow: "auto",
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<Box
							component={OrderList}
							title="Dough Station"
							orders={orders.dough}
							sx={(theme) => ({
								maxHeight: `calc(100vh - ${theme.spacing(4)})`,
								overflow: "auto",
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<Box
							component={OrderList}
							title="Topping Station"
							orders={orders.topping}
							sx={(theme) => ({
								maxHeight: `calc(100vh - ${theme.spacing(4)})`,
								overflow: "auto",
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<Box
							component={OrderList}
							title="Oven Station"
							orders={orders.oven}
							sx={(theme) => ({
								maxHeight: `calc(100vh - ${theme.spacing(4)})`,
								overflow: "auto",
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<Box
							component={OrderList}
							title="Waiter Station"
							orders={orders.waiter}
							sx={(theme) => ({
								maxHeight: `calc(100vh - ${theme.spacing(4)})`,
								overflow: "auto",
							})}
						/>
					</Grid>
					<Grid item xs={2}>
						<Box
							component={OrderList}
							title="Done"
							orders={orders.completed}
							sx={(theme) => ({
								maxHeight: `calc(100vh - ${theme.spacing(4)})`,
								overflow: "auto",
							})}
						/>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}

const groupOrders = (orders: OrderModel[]) => {
	const pending: OrderModel[] = [];
	const dough: OrderModel[] = [];
	const topping: OrderModel[] = [];
	const oven: OrderModel[] = [];
	const waiter: OrderModel[] = [];
	const completed: OrderModel[] = [];

	orders.forEach((order) => {
		const statusLogs = order.logs.map((log) => log.state);
		if (statusLogs.includes("WAITER_END")) {
			completed.push(order);
		} else if (statusLogs.includes("WAITER_START")) {
			waiter.push(order);
		} else if (
			statusLogs.some((l) => ["OVEN_START", "OVEN_END"].includes(l))
		) {
			oven.push(order);
		} else if (
			statusLogs.some((l) => ["TOPPING_START", "TOPPING_END"].includes(l))
		) {
			topping.push(order);
		} else if (
			statusLogs.some((l) => ["DOUGH_START", "DOUGH_END"].includes(l))
		) {
			dough.push(order);
		} else {
			pending.push(order);
		}
	});

	return {
		pending,
		dough,
		topping,
		oven,
		waiter,
		completed: completed.reverse(),
	};
};

export default App;
