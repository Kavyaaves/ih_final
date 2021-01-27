import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
// import axios from 'axios';
// import { hot } from 'react-hot-loader';
import MainRouter from './MainRouter';
import theme from './theme';
import UserProvider from './providers/UserProvider';

const App = () => {
	// React.useEffect(() => {
	// 	const jssStyles = document.querySelector('#jss-server-side');
	// 	if (jssStyles) {
	// 		jssStyles.parentNode.removeChild(jssStyles);
	// 	}
	// }, []);

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<UserProvider >
					<MainRouter />
				</UserProvider>
			</ThemeProvider>
		</BrowserRouter>
	);
};

export default App;
