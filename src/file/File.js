import React, { useState, useEffect, useContext } from 'react';
import Card from '@material-ui/core/Card';
import { db, storage } from '../firebase';
import { UserContext } from '../providers/UserProvider';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		// backgroundColor: '#505050',
		// background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
		borderRadius: '5px',
		fontSize: 'small',
	},
	cardContent: {
		backgroundColor: 'none',
		padding: 0,
		color: 'black',
		fontSize: 'small',
	},
	cardHeader: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		color: 'white',
		fontSize: 'small',
	},
	text: {
		color: 'black',
		fontSize: 'small',
		margin: theme.spacing(3),
	},
	photo: {
		textAlign: 'center',
		backgroundColor: '#f2f5f4',
		padding: theme.spacing(1),
	},
	// media: {
	// 	height: 200,
	// },
	button: {
		padding: '5px',
	},
}));

export default function File(props) {
	const classes = useStyles();
	const user = useContext(UserContext);
	const [values, setValues] = useState({
		comments: [],
		delDialog: false,
	});
	const [show, setShow] = useState(false);
	useEffect(() => {
		// let unsubscribe;
		// if (postId) {
		// 	unsubscribe = () => {
		db.collection('posts')
			.doc(`${props.file.id}`)
			.collection('comments')
			.orderBy('postedAt', 'desc')
			.onSnapshot((snapshot) => {
				setValues({ comments: snapshot.docs.map((doc) => doc.data()) });
			});
	}, [props.file.id]);

	if (props.file.comments === undefined) {
		props.file.comments = [];
	}

	const deleteFile = async (post) => {
		await db
			.collection('posts')
			.doc(post.id)
			.delete()
			.then((data) => {
				props.removeUpdate(post);
			})
			.catch((err) => {
				alert(err);
			});
		const fileRef = storage.ref('files');
		console.log(post);
		post.files?.map((file) => {
			console.log(file);
			fileRef
				.child(`${post.id}${file.filename}`)
				.delete()
				.then(() => {
					console.log('Deleted');
				})
				.catch((error) => {
					alert(error);
				});
		});
	};

	return (
		<div className={classes.card}>
			<CardHeader
				action={
					<IconButton
						style={{ color: 'black', fontSize: 'small' }}
						onClick={(e) => {
							e.preventDefault();
							setValues({ delDialog: true });
						}}>
						<DeleteIcon />
					</IconButton>
				}
				title={
					<Link
						to={'/users/' + props.file.userId}
						style={{ color: 'black', fontSize: 'small' }}>
						{props.file.username}
					</Link>
				}
				subheader={
					props.file.timestamp?.toDate().toDateString() +
					'  ' +
					props.file.timestamp?.toDate().toLocaleTimeString(undefined, {
						timezone: 'Asia/kolkata',
					})
				}
				className={classes.cardHeader}
			/>

			<CardContent className={classes.cardContent}>
				<Typography component='p' className={classes.text}>
					{props.file.files &&
						props.file.files.map((fx, i) => (
							<a
								href={props.file.files[i].url}
								target='_blank'
								download={props.file.files[i].filename}
								rel='noreferrer'
								key={i}>
								<Typography key={i}>{props.file.files[i].filename}</Typography>
							</a>
						))}
				</Typography>
			</CardContent>
			<CardActions
				style={{
					padding: 0,
					fontSize: 'small',
				}}>
				<IconButton
					variant='dense'
					className={classes.button}
					aria-label='Comment'
					color='primary'>
					<CommentIcon variant='dense' fontSize='small' />
				</IconButton>
				<span>{values.comments ? values.comments.length : 0}</span>
				{!show && (
					<Button
						align='right'
						variant='dense'
						color='secondary'
						style={{
							float: 'right',
							margin: 'auto',
							background: '#424242',
							color: '#fff',
							fontSize: 10,
							paddingTop: 5,
							paddingBottom: 5,
							paddingRight: 10,
							paddingLeft: 10,
						}}
						onClick={(e) => {
							e.preventDefault();
							setShow(true);
						}}>
						Show Comments
					</Button>
				)}
				{show && (
					<Button
						align='right'
						variant='dense'
						color='secondary'
						onClick={(e) => {
							e.preventDefault();
							setShow(false);
						}}
						style={{
							float: 'right',
							margin: 'auto',
							background: '#424242',
							color: '#fff',
							fontSize: 10,
							paddingTop: 5,
							paddingBottom: 5,
							paddingRight: 10,
							paddingLeft: 10,
						}}>
						Hide Comments
					</Button>
				)}

				<Dialog open={values.delDialog} disableBackdropClick={true}>
					<DialogTitle>Delete post</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Are you sure you want to delete the post?
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							color='primary'
							autoFocus='autoFocus'
							variant='contained'
							onClick={(e) => {
								setValues({ delDialog: false });
							}}>
							Cancel
						</Button>
						<Button
							color='primary'
							autoFocus='autoFocus'
							variant='contained'
							onClick={(e) => {
								e.preventDefault();
								deleteFile(props.file);
								setValues({ delDialog: false });
							}}>
							Yes
						</Button>
					</DialogActions>
				</Dialog>
			</CardActions>
			<br />
			<Divider />
			{show && (
				<Comments
					user={user}
					postId={props.file.id}
					key={props.file.id}
					comments={values.comments}
				/>
			)}
			<br />
		</div>
	);
}
