import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import { auth, signInWithGoogle, db } from '../firebase';
import firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: -20,
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
		minHeight: 500,
	},
	card: {
		maxWidth: 600,
		margin: 'auto',
		textAlign: 'center',
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
	},
	error: {
		verticalAlign: 'middle',
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
	submit: {
		backgroundColor: '#424242',
		margin: 'auto',
		marginBottom: theme.spacing(2),
		display: 'flex',
		paddingLeft: 10,
		textTransform: 'none',
	},
}));

const getUserDocument = async (uid) => {
	if (!uid) return null;
	try {
		const userDocument = await db.doc(`users/${uid}`).get();
		return {
			uid,
			...userDocument.data(),
		};
	} catch (error) {
		console.error('Error fetching user', error);
	}
};

export const generateUserDocument = async (user, name, contact) => {
	if (!user) return;
	const userRef = db.doc(`users/${user.uid}`);
	const snapshot = await userRef.get();
	console.log(user);
	if (!snapshot.exists) {
		try {
			// const { email, displayName, phoneNumber } = user;
			await userRef.set({
				email: user.email,
				displayName: name,
				phoneNumber: contact,
				role: 'User',
				created: firebase.firestore.FieldValue.serverTimestamp(),
			});
		} catch (error) {
			console.error('Error creating user document', error);
		}
	}
	return getUserDocument(user.uid);
};

const SignUp = () => {
	const classes = useStyles();
	const [values, setValues] = useState({
		name: '',
		password: '',
		email: '',
		open: false,
		error: null,
		role: 'User',
		contact: '',
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
		console.log(values);
	};

	const createUserWithEmailAndPasswordHandler = async (event) => {
		event.preventDefault();

		const email = values.email;
		const password = values.password;
		await auth
			.createUserWithEmailAndPassword(email, password)
			.then(function (result) {
				return result.user.updateProfile({
					displayName: values.name,
					phoneNumber: values.contact,
				});
			})
			.catch((error) => {
				alert(error);
			});
		let user = auth.currentUser;
		generateUserDocument(user, values.name, values.contact)
			.then((data) => {
				setValues({
					name: '',
					password: '',
					email: '',
					role: 'User',
					open: true,
					error: null,
					contact: '',
				});
			})
			.catch((error) => {
				setValues({ error: 'Error Signing up with email and password' });
			});
	};
	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Sign Up
					</Typography>
					<TextField
						id='name'
						label='Name'
						className={classes.textField}
						value={values.name}
						onChange={handleChange('name')}
						margin='normal'
					/>
					<br />
					<TextField
						id='email'
						type='email'
						label='Email'
						className={classes.textField}
						value={values.email}
						onChange={handleChange('email')}
						margin='normal'
					/>
					<br />
					<TextField
						id='password'
						type='password'
						label='Password'
						className={classes.textField}
						value={values.password}
						onChange={handleChange('password')}
						margin='normal'
					/>
					<br />
					<TextField
						id='contact'
						type='contact'
						label='Phone Number'
						className={classes.textField}
						value={values.contact}
						onChange={handleChange('contact')}
						margin='normal'
					/>
					{values.error !== null && (
						<Typography component='p' color='error'>
							<Icon color='error' className={classes.error}>
								error
							</Icon>
							{values.error}
						</Typography>
					)}
				</CardContent>
				<CardActions style={{ display: 'block' }}>
					<Button
						color='primary'
						variant='contained'
						onClick={createUserWithEmailAndPasswordHandler}
						className={classes.submit}>
						{' '}
						Submit
					</Button>
					{/* <Button
						color='primary'
						variant='contained'
						onClick={(event) => {
							signInWithGoogle(event, values.email, values.password);
						}}
						style={{ margin: 'auto', textTransform: 'none', paddingLeft: 10 }}
						className={classes.submit}>
						{/* <span> */}
					{/* <img
							style={{ height: 18, width: 18, margin: 'auto' }}
							src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
							alt='Google'
						/>
						&nbsp; &nbsp;
						<span>Sign in with Google</span>
					</Button> */}{' '}
					<p>
						Already having an account? <Link to='/signin'>Sign in here</Link>
					</p>
				</CardActions>
			</Card>
			<Dialog open={values.open} disableBackdropClick={true}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to='/'>
						<Button color='primary' autoFocus='autoFocus' variant='contained'>
							Ok
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
};
export default SignUp;
