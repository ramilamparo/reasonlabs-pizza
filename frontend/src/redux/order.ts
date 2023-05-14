import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { OrderModel } from "../models/order.model";

// Define a type for the slice state
interface RoundState {
	list: OrderModel[];
}

// Define the initial state using that type
const initialState: RoundState = {
	list: [],
};

export const roundSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		upsert: (state, action: PayloadAction<OrderModel>) => {
			const index = state.list.findIndex(
				(order) => order.id === action.payload.id
			);
			if (index >= 0) {
				state.list[index] = action.payload;
			} else {
				state.list.push(action.payload);
			}
		},
	},
});

export const { upsert } = roundSlice.actions;

export default roundSlice.reducer;
