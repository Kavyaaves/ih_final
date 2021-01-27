import React, { Component, useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

const PrivateRoute = ({ component: Component, ...rest }) => {
	// const user = useContext(UserContext);
	const user = useContext(UserContext);
	console.log(user);
	return (
		<Route
			{...rest}
			render={(props) =>
				user ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{
							pathname: '/signin',
							state: { from: props.location },
						}}
					/>
				)
			}
		/>
	);
};

export default PrivateRoute;
