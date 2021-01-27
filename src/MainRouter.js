import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './core/Home';
import Users from './user/Users';
import Signup from './components/Signup';
import Signin from './components/Signin';
import EditProfile from './user/EditProfile';
import Profile from './user/Profile';
import PrivateRoute from './auth/PrivateRoute';
import Menu from './core/Menu';
import SubmitPaper from './user/SubmitPaper';
import Archives from './archives/Archives';
import FilesList from './file/FileList';
import Editorial from './core/Editorial';
import Instructions from './core/Instructions';
import banner from './core/static/banner.png';
import ViewArchive from './archives/ViewArchive';
// import UserProvider from './providers/UserProvider';
// import Home from './pages/Home';
const MainRouter = () => {
	// const user = auth.isAuthenticated().user;
	return (
		<div style={{ textDecoration: 'none' }}>
			<img
				src={banner}
				alt='ih'
				style={{
					flexGrow: 1,
					maxWidth: '100%',
					height: 'auto',
					marginBottom: -5,
				}}
			/>
			<Menu />
			<Switch
				style={{ background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)' }}>
				<Route exact path='/' component={Home} />
				<Route exact path='/editorial' component={Editorial} />
				<Route path='/signup' component={Signup} />
				<Route path='/signin' component={Signin} />
				<Route path='/instruct' component={Instructions} exact={true} />
				<Route path='/users' component={Users} exact={true} />
				<Route path='/user/edit/:userId' component={EditProfile} exact={true} />
				<Route path='/users/:userId' component={Profile} exact={true} />
				<PrivateRoute path='/submit' component={SubmitPaper} exact={true} />
				<Route path='/list' component={FilesList} exact={true} />
				<Route path='/archives' component={Archives} exact={true} />
				<Route path='/:name' component={ViewArchive} exact={true} />
			</Switch>
		</div>
	);
};

export default MainRouter;
