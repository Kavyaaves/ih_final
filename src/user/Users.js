import React, { useState, useEffect } from 'react';
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
import ArrowForward from '@material-ui/icons/ArrowForward';
import Person from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';
import { db, auth } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const useStyles = makeStyles((theme) => ({
	root: theme.mixins.gutters({
		padding: theme.spacing(1),
		margin: theme.spacing(5),
		maxWidth: 600,
		margin: 'auto',
	}),
	title: {
		margin: `${theme.spacing(4)}px 0 ${theme.spacing(2)}px`,
		color: theme.palette.openTitle,
	},
}));

export default function Users() {
	const classes = useStyles();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const docRef = db.collection('users');

		docRef.orderBy('displayName').onSnapshot((snapshot) => {
			const postData = [];
			snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
			setUsers(postData);
		});
	}, []);

	console.log(users);

	return (
		<div
			style={{
				background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
				minHeight: 350,
			}}>
			<Paper className={classes.root} elevation={4}>
				<Typography variant='h6' className={classes.title}>
					All Users
				</Typography>
				<List dense>
					{users.map((item, i) => {
						return (
							<ListItem button>
								<ListItemAvatar>
									<Avatar>
										<Person />
									</Avatar>
								</ListItemAvatar>
								<ListItemText primary={item.displayName} />
								<ListItemSecondaryAction>
									<Link to={'/users/' + item.id} key={i}>
										<IconButton>
											<ArrowForward />
										</IconButton>
									</Link>
								</ListItemSecondaryAction>
							</ListItem>
						);
					})}
				</List>
			</Paper>
		</div>
	);
}
