import React, { useState } from 'react';
import { auth } from '../firebase';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		textAlign: 'center',
		marginTop: theme.spacing(5),
		paddingBottom: theme.spacing(2),
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
		display: 'flex',
		margin: 'auto',
		marginBottom: theme.spacing(2),

		paddingLeft: 10,
		textTransform: 'none',
	},
}));

const SignIn = () => {
	const classes = useStyles();
	const history = useHistory();
	const [values, setValues] = useState({
		email: '',
		password: '',
		error: null,
		redirect: false,
	});
	const handleChange = (name) => (event) => {
		setValues({ ...values, [name]: event.target.value });
	};

	const signIn = (email, password) => {
		auth
			.signInWithEmailAndPassword(email, password)
			.then((data) => setValues({ redirect: true }))
			.catch((error) => {
				alert(error);
			});
	};

	if (values.redirect) return <Redirect to='/' />;

	return (
		<div
			style={{
				background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
				marginTop: -20,
				minHeight: '400px',
			}}>
			<Card className={classes.card}>
				<CardContent>
					<Typography variant='h6' className={classes.title}>
						Sign In
					</Typography>
					{values.error !== null && <div>{values.error}</div>}
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
					<br />{' '}
					<CardActions style={{ display: 'block' }}>
						<Button
							color='primary'
							variant='contained'
							className={classes.submit}
							onClick={(e) => {
								e.preventDefault();
								signIn(values.email, values.password);
							}}>
							&nbsp; &nbsp;<span>Submit</span>
							&nbsp;&nbsp;
						</Button>
						{/* <Button
							color='primary'
							variant='contained'
							onClick={(event) => {
								event.preventDefault();
								signInWithGoogle();
							}}
							style={{ margin: 'auto', textTransform: 'none', paddingLeft: 10 }}
							className={classes.submit}>
							{/* <span> */}
						{/* <img
								style={{ height: 18, width: 18 }}
								src='https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg'
								alt='Google'
							/>
							&nbsp; &nbsp;
							<span>Sign in with Google</span>
						</Button> */}{' '}
						<br />
						<p
							style={{
								textAlign: 'center',
								fontFamily: 'Roboto, Helvetica',
								fontSize: 12,
							}}>
							Not having an account? <Link to='/signup'>Sign up here</Link>{' '}
							<br /> <Link to='/reset'>Forgot Password?</Link>
						</p>
					</CardActions>
				</CardContent>
			</Card>
		</div>
	);
};
export default SignIn;
