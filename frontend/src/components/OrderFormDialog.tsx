import {
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	Box,
} from "@mui/material";
import { ToppingAutocompleteInput } from "./inputs/ToppingAutocompleteInput";
import { useCallback, useState } from "react";
import { ToppingModel } from "../models/topping.model";
import { createOrder } from "../api/order.api";

export interface OrderFormDialogProps {
	open: boolean;
	onClose: () => void;
}

export const OrderFormDialog = ({ open, onClose }: OrderFormDialogProps) => {
	const [toppings, setToppings] = useState<ToppingModel[]>([]);

	const handleClose = useCallback(() => {
		setToppings([]);
		onClose();
	}, [onClose]);

	const handleSubmit = useCallback(async () => {
		await createOrder(toppings.map((t) => t.id));
		handleClose();
	}, [handleClose, toppings]);

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Select Toppings</DialogTitle>
			<DialogContent>
				<Box sx={{ py: 2 }}>
					<ToppingAutocompleteInput
						value={toppings}
						onChange={setToppings}
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button onClick={handleSubmit}>Submit</Button>
			</DialogActions>
		</Dialog>
	);
};
