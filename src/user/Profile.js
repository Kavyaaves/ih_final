import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import Person from '@material-ui/icons/Person';
import Divider from '@material-ui/core/Divider';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { UserContext } from '../providers/UserProvider';
// import { read, update } from './api-user.js';
import { Redirect, Link } from 'react-router-dom';
import DeleteIcon from '@material-ui/icons/Delete';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { db, auth } from '../firebase';

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
	}),
	title: {
		marginTop: theme.spacing(3),
		color: theme.palette.protectedTitle,
		textAlign: 'center',
	},
}));

export default function Profile({ match }) {
	const classes = useStyles();
	const [user, setUser] = useState('');
	const [role, setRole] = useState('User');
	const [authRole, setAuthRole] = useState(false);
	const [delDialog, setDelDialog] = useState(false);
	const [open, setOpen] = useState(false);
	const [redirect, setRedirect] = useState(false);
	const authUser = useContext(UserContext);
	const userId = match.params.userId;
	console.log(userId);

	useEffect(() => {
		var ref = db.doc(`/users/${userId}`);

		ref.onSnapshot(function (doc) {
			// alert('Current data: ', doc.data());
			setUser(doc.data());
			setRole(doc.data().role);
		});

		const authuid = auth.currentUser.uid;
		var authref = db.doc(`/users/${authuid}`);
		authref.onSnapshot((doc) => {
			setAuthRole(doc.data().role);
		});
	}, []);

	const { displayName, created, email } = user;

	const handleRoleChange = (e) => {
		e.preventDefault();
		var ref = db.doc(`/users/${userId}`);

		// Set the "capital" field of the city 'DC'
		ref
			.update({
				role: e.target.value,
			})
			.catch(function (error) {
				// The document probably doesn't exist.
				alert('Error updating document: ', error);
			});
	};

	const clickButton = () => {
		setOpen(true);
	};

	const handleRequestClose = () => {
		setOpen(false);
	};

	if (redirect) {
		return <Redirect to='/' />;
	}

	return (
		<div
			style={{
				background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
				marginTop: 0,
				minHeight: 350,
			}}>
			<div>
				<Paper className={classes.root} elevation={4}>
					<Typography variant='h6' className={classes.title}>
						Profile
					</Typography>
					<List dense>
						<ListItem style={{ display: 'block' }}>
							<ListItemAvatar>
								<Avatar>
									<Person />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={displayName} secondary={email} />
							{role === 'Admin' && (
								<FormControl className={classes.formControl}>
									<InputLabel shrink>Role</InputLabel>
									<Select
										value={role}
										onChange={handleRoleChange}
										displayEmpty
										className={classes.selectEmpty}>
										<MenuItem value={role}>
											<em>{role}</em>
										</MenuItem>
										<MenuItem value='User'>User</MenuItem>
										<MenuItem value='Admin'>Admin</MenuItem>
										<MenuItem value='Reviewer'>Reviewer</MenuItem>
										<MenuItem value='Member'>Member</MenuItem>
									</Select>
								</FormControl>
							)}
							<ListItemSecondaryAction>
								<Link to={'/user/edit/' + userId}>
									<IconButton aria-label='Edit' color='primary'>
										<Edit />
									</IconButton>
								</Link>
								&nbsp; &nbsp;
							</ListItemSecondaryAction>
							{/* )} */}
						</ListItem>
						<br />
						<Divider />
						<ListItem>
							<ListItemText
								primary={
									'Joined: ' +
									created?.toDate().toDateString() +
									'  ' +
									created?.toDate().toLocaleTimeString(undefined, {
										timezone: 'Asia/kolkata',
									})
								}
							/>
						</ListItem>
					</List>

					{/* <ProfileTabs
						user={user}
						files={files}
						removeFileUpdate={removeFile}
					/> */}
				</Paper>
			</div>
		</div>
	);
}
