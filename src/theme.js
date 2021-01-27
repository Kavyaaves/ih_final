import { createMuiTheme } from '@material-ui/core/styles';
// import { yellowA700 } from 'material-ui/styles/colors';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#52c7b8',
			main: '#424242',
			dark: '#000000',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ffd95b',
			main: '#fff',
			dark: '#c77800',
			contrastText: '#424242',
		},
		// openTitle: offwhite,
		// protectedTitle: yellow,
		type: 'light',
	},
	typography: {
		fontSize: 10,
	},
	button: {
		disableElevation: true,
	},
	spacing: 4,
	props: {
		MuiList: {
			dense: true,
		},
		MuiAppBar: {
			dense: 'true',
		},
		bgColor: 'linear-gradient(to left, #ffefba, #ffffff)',
		MuiButtonBase: {
			// The default props to change
			disableRipple: false, // No more ripple, on the whole application 💣!
		},
	},
});

export default theme;
