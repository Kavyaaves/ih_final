import React, { useState, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';

import { NavLink, withRouter, useLocation } from 'react-router-dom';
import Left from './Left';
import { UserContext } from '../providers/UserProvider';
import { auth } from '../firebase';
const isActive = (history, path) => {
	if (history.location.pathname == path) return { color: '#ff4081' };
	else return { color: '#ffffff' };
};
const useStyles = makeStyles((theme) => {
	return createStyles({
		root: {
			borderTop: 0,
			flexGrow: 1,
			width: '100%',
			justifyContent: 'right',
			marginTop: 0,
			background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
			minHeight: 10,
			// background: 'linear-gradient(to right, #8e2de2, #4a00e0)',
		},

		menuButton: {
			marginRight: theme.spacing(2),
			'@media (max-width: 767px)': {
				display: 'block',
			},
			'@media (min-width: 768px)': {
				display: 'none',
			},
		},
		title: {
			width: '40%',
			flexGrow: 1,
			display: 'none',
			[theme.breakpoints.up('sm')]: {
				display: 'block',
			},
			marginRight: theme.spacing(24),
		},
		toolbar: {
			'@media (max-width: 767px)': {
				height: 10,
				padding: 0,
			},
		},
		search: {
			// padding: '4px 4px 4px 0px',
			position: 'relative',

			overflow: 'hidden',
			float: 'right',
			// padding: '4px',
			borderRadius: theme.shape.borderRadius,
			backgroundColor: fade(theme.palette.common.white, 0.8),
			'&:hover': {
				backgroundColor: fade(theme.palette.common.white, 0.7),
			},

			width: '50%',
			[theme.breakpoints.up('sm')]: {
				marginLeft: theme.spacing(1),
				width: 'auto',
			},
		},
		inputBase: {},

		searchIcon: {
			color: theme.palette.text.primary,
			// padding: theme.spacing(-2, 0, 0, 2),e
			paddingBottom: '10px',
			height: '100%',
			position: 'absolute',
			pointerEvents: 'none',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
		},

		button: {
			background: 'inherit',
			color: 'white',
			fontSize: '10px',
			justifyItems: 'spaceBetween',
			marginRight: '10px',
			'&:hover': {
				color: '#424242',
			},
			'@media (max-width: 767px)': {
				height: 20,
			},
		},
		inputInput: {
			color: theme.palette.secondary,
			padding: theme.spacing(1, 1, 1, 0),
			// vertical padding + font size from searchIcon
			paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
			transition: theme.transitions.create('width'),
			width: '100%',
		},
	});
});

export default withRouter(function Menu({ history }) {
	const classes = useStyles();
	const location = useLocation();
	const [color, setColor] = useState('white');
	const [state, setState] = useState(false);
	const user = useContext(UserContext);
	console.log(user);
	// const { displayName, email } = user;

	const bgChange = (e) => {
		const nextColor = color === 'white' ? 'red' : 'white';
		setColor(nextColor);
	};
	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar variant='dense' className={classes.toolbar}>
					{/* <IconButton
						edge='start'
						className={classes.menuButton}
						color='inherit'
						aria-label='drawer'
						onClick={() => {
							setState(true);
						}}>
						<MenuIcon />
					</IconButton> */}
					<NavLink to='/' style={{ justifyContent: 'space-evenly' }}>
						<Button
							className={classes.button}
							style={isActive(history, '/')}
							variant='contained'
							onClick={bgChange}>
							Home
						</Button>
					</NavLink>
					&nbsp;
					{!user && (
						<div>
							<NavLink to='/signup'>
								<Button
									style={isActive(history, '/signup')}
									className={classes.button}
									variant='contained'>
									Sign up
								</Button>
							</NavLink>
							&nbsp;
							<NavLink to='/signin'>
								<Button
									style={isActive(history, '/signin')}
									className={classes.button}
									// style={{ position: 'relative', marginRight: '500px' }}
									variant='contained'>
									Sign In
								</Button>
							</NavLink>
						</div>
					)}
					{user && (
						<div style={{ display: 'flex' }}>
							<NavLink to={`/users/${user.uid}`}>
								<Button
									variant='contained'
									color='inherit'
									style={isActive(history, '/users/' + user.uid)}
									className={classes.button}>
									My Profile
								</Button>
							</NavLink>
							&nbsp;
							<NavLink to=''>
								<Button
									variant='contained'
									color='inherit'
									className={classes.button}
									onClick={() => {
										auth.signOut();
									}}>
									Sign out
								</Button>
							</NavLink>
							&nbsp;
						</div>
					)}
				</Toolbar>
			</AppBar>
			{state && <Left />}
			<br />
			{location.pathname === '/' && (
				<div
					style={{
						flexGrow: 1,
						width: '80%',
						background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
						margin: 'auto',
						float: 'right',
					}}>
					<marquee
						style={{
							flexGrow: 1,
							marginTop: '1px',
							border: '3px solid black',
							borderRight: '15px solid black',
							borderLeft: '15px solid black',
							color: 'red',
							fontSize: '12px',
							height: '15px',
							width: '50%',
							flexDirection: 'column',
							overflow: 'hidden',
							position: 'absolute',
							margin: 'auto',
							// background: '#fff',
						}}>
						Welcome to Indian Hydrobiology
					</marquee>
				</div>
			)}
		</div>
	);
});
