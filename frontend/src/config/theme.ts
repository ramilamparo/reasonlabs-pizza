import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		text: {
			primary: "#fff",
			secondary: "#fff",
		},
		background: {
			default: blueGrey[800],
			paper: blueGrey[400],
		},
	},
});
