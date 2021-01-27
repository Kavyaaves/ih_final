import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { auth, db } from '../firebase';
import { UserContext } from '../providers/UserProvider';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		textAlign: 'center',
		// marginTop: theme.spacing(5),
		// paddingBottom: theme.spacing(2),
	},
	title: {
		margin: theme.spacing(2),
		color: theme.palette.protectedTitle,
	},
	error: {
		verticalAlign: 'middle',
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
	submit: {
		margin: 'auto',
		// marginBottom: theme.spacing(2),
	},
}));

export default function EditProfile({ match }) {
	const classes = useStyles();
	// const [user, setUser] = useState('');
	const authUser = useContext(UserContext);

	const userId = match.params.userId;
	useEffect(() => {
		var ref = db.doc(`/users/${userId}`);
		ref.onSnapshot(function (doc) {
			// alert('Current data: ', doc.data());
			setValues({ user: doc.data() });
		});
	}, []);

	const [values, setValues] = useState({
		user: '',
		// name: user?.displayName,
		// // password: '',
		// email: user?.email,
		open: false,
		error: '',
		// contact: user?.phoneNumber,
		redirectToProfile: false,
	});

	console.log(values);
	// useEffect(() => {
	// 	const abortController = new AbortController();
	// 	const signal = abortController.signal;

	// 	read(
	// 		{
	// 			userId: match.params.userId,
	// 		},
	// 		{ t: jwt.token },
	// 		signal
	// 	).then((data) => {
	// 		if (data && data.error) {
	// 			setValues({ ...values, error: data.error });
	// 		} else {
	// 			setValues({ ...values, name: data.name, email: data.email });
	// 		}
	// 	});
	// 	return function cleanup() {
	// 		abortController.abort();
	// 	};
	// }, [match.params.userId]);

	const clickSubmit = () => {
		const editeduser = {
			name: values.user.displayName || undefined,
			email: values.user.email || undefined,
			// password: values.password || undefined,
			contact: values.user.phoneNumber || undefined,
		};
		// update(
		// 	{
		// 		userId: match.params.userId,
		// 	},
		// 	{
		// 		t: jwt.token,
		// 	},
		// 	user
		// ).then((data) => {
		// 	if (data && data.error) {
		// 		setValues({ ...values, error: data.error });
		// 	} else {
		// 		setValues({ ...values, userId: data._id, redirectToProfile: true });
		// 	}
		// });
	};
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	if (values.redirectToProfile) {
		return <Redirect to={'/user/' + userId} />;
	}
	return (
		<div style={{ background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)' }}>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Edit Profile
					</Typography>
					<TextField
						shrink
						id='name'
						label='Name'
						className={classes.textField}
						value={values.user.displayName}
						onChange={handleChange('name')}
						margin='normal'
					/>
					<br />
					<TextField
						shrink
						id='email'
						type='email'
						label='Email'
						className={classes.textField}
						value={values.user.email}
						onChange={handleChange('email')}
						margin='normal'
					/>
					<br />
					<TextField
						shrink
						disabled={true}
						id='password'
						type='password'
						label='Password'
						className={classes.textField}
						value={values.user.password}
						onChange={handleChange('password')}
						margin='normal'
					/>
					<TextField
						shrink
						id='contact'
						type='contact'
						label='Phone Number'
						className={classes.textField}
						value={values.user.phoneNumber}
						onChange={handleChange('contact')}
						margin='normal'
					/>
					<br />{' '}
					{values.error && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions>
					<Button
						color='primary'
						variant='contained'
						onClick={clickSubmit}
						className={classes.submit}>
						Submit
					</Button>
				</CardActions>
			</Card>
		</div>
	);
}
