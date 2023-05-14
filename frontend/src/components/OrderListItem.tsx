import { useEffect, useMemo, useState } from "react";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { OrderModel, OrderStatus } from "../models/order.model";

export interface OrderItemProps {
	order: OrderModel;
}

export const OrderListItem = ({ order }: OrderItemProps) => {
	const [open, setOpen] = useState(false);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const id = setTimeout(() => {
			setShow(true);
		}, 100);
		return () => clearTimeout(id);
	}, []);

	const icon = useMemo(() => {
		const logStatuses = order.logs.map((log) => log.state);

		const statuses: OrderStatus[] = [
			"WAITER_END",
			"WAITER_START",
			"OVEN_END",
			"OVEN_START",
			"TOPPING_END",
			"TOPPING_START",
			"DOUGH_END",
			"DOUGH_START",
			"PENDING",
		];

		const lastStatus = statuses.find((status) =>
			logStatuses.includes(status)
		);

		switch (lastStatus) {
			case "PENDING":
			case "DOUGH_START":
			case "TOPPING_START":
			case "OVEN_START":
			case "WAITER_START":
				return <CircularProgress size={18} />;
			case "DOUGH_END":
			case "TOPPING_END":
			case "OVEN_END":
			case "WAITER_END":
				return <CheckIcon fontSize="small" color="success" />;
			default:
				return null;
		}
	}, [order]);

	return (
		<>
			<Collapse in={show} timeout="auto" unmountOnExit>
				<ListItemButton onClick={() => setOpen((open) => !open)}>
					<ListItemIcon sx={{ alignItems: "center" }}>
						<LocalPizzaIcon />
						{icon}
					</ListItemIcon>
					<ListItemText primary={`#${order.id}`} />
					{open ? <ExpandLess /> : <ExpandMore />}
				</ListItemButton>
			</Collapse>
			<Collapse in={open} timeout="auto" unmountOnExit>
				<List component="div" disablePadding>
					{order.pizza?.toppings?.map((topping) => {
						return (
							<ListItemButton key={topping.id} sx={{ pl: 4 }}>
								<ListItemIcon>
									<ScatterPlotIcon />
								</ListItemIcon>
								<ListItemText
									sx={{ overflow: "auto" }}
									primary={topping.name}
								/>
							</ListItemButton>
						);
					})}
				</List>
			</Collapse>
		</>
	);
};
