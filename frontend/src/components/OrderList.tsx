import { List, ListSubheader } from "@mui/material";
import { OrderModel } from "../models/order.model";
import { OrderListItem } from "./OrderListItem";

export interface OrderListProps {
	title: string;
	orders: OrderModel[];
	className?: string;
}

export const OrderList = ({ orders, title, className }: OrderListProps) => {
	return (
		<List
			className={className}
			sx={{ width: "100%", bgcolor: "background.paper" }}
			subheader={<ListSubheader>{title}</ListSubheader>}
		>
			{orders.map((order) => (
				<OrderListItem key={order.id} order={order} />
			))}
		</List>
	);
};
