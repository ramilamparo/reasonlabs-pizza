import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

export const theme = createTheme({
	palette: {
		primary: {
			main: blueGrey[900],
			contrastText: "#fff",
		},
		text: {
			primary: "#fff",
			secondary: "#fff",
		},
		background: {
			default: blueGrey[800],
			paper: blueGrey[400],
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		},
	},
});
