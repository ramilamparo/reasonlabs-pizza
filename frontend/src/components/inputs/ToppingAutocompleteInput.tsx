import { useCallback, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { ToppingModel } from "../../models/topping.model";
import { createTopping, getToppings } from "../../api/topping.api";

export interface ToppingAutocompleteInputProps {
	value: ToppingModel[];
	onChange: (value: ToppingModel[]) => void;
}

const filter = createFilterOptions<ToppingModel | CustomValue>();

export const ToppingAutocompleteInput = ({
	value,
	onChange,
}: ToppingAutocompleteInputProps) => {
	const [toppings, setToppings] = useState<ToppingModel[]>([]);

	const refreshToppingList = useCallback(async () => {
		const { data } = await getToppings();
		setToppings(data);
	}, []);

	const handleChange = useCallback(
		async (value: Array<string | ToppingModel | CustomValue>) => {
			const selectedToppings: ToppingModel[] = [];
			for (const item of value) {
				if (typeof item === "string") {
					const { data } = await createTopping(item);
					selectedToppings.push(data);
				} else {
					if ("inputValue" in item) {
						const { data } = await createTopping(item.inputValue);
						selectedToppings.push(data);
					} else {
						selectedToppings.push(item);
					}
				}
			}
			await refreshToppingList();
			onChange(selectedToppings);
		},
		[onChange, refreshToppingList]
	);

	useEffect(() => {
		refreshToppingList();
	}, [refreshToppingList]);

	return (
		<Autocomplete
			multiple
			value={value}
			onChange={(_, newValue) => handleChange(newValue)}
			disableCloseOnSelect
			filterOptions={(options, params) => {
				const filtered = filter(options, params).filter((item) => {
					if ("id" in item) {
						return !value.some((value) => value.id === item.id);
					}
					return true;
				});

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some(
					(option) => inputValue === option.name
				);
				if (inputValue !== "" && !isExisting) {
					filtered.push({
						inputValue,
						name: `Add "${inputValue}"`,
					});
				}

				return filtered;
			}}
			selectOnFocus
			clearOnBlur
			handleHomeEndKeys
			options={toppings as Array<ToppingModel | CustomValue>}
			getOptionLabel={(option) => {
				// Value selected with enter, right from the input
				if (typeof option === "string") {
					return option;
				}
				return option.name;
			}}
			renderOption={(props, option) => <li {...props}>{option.name}</li>}
			sx={{ width: 300 }}
			freeSolo
			renderInput={(params) => <TextField {...params} label="Toppings" />}
		/>
	);
};

interface CustomValue {
	inputValue: string;
	name: string;
}
