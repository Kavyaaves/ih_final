import React, { useState, useEffect } from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import SendSharpIcon from '@material-ui/icons/SendSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import { CardContent } from '@material-ui/core';
import { db } from '../firebase';
import { auth } from '../firebase';
import firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
	root: {
		fontFamily: 'Open Sans, Roboto',
		fontSize: 6,
	},
	cardHeader: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		lineHeight: '5px',
		variant: 'dense',
	},
	smallAvatar: {
		width: 25,
		height: 25,
	},
	commentField: {
		width: '100%',
		display: 'inline-flex',
	},
	commentText: {
		marginBottom: 0,
		backgroundColor: '#424242',
		color: 'white',
		borderRadius: '2px',
		fontSize: '10px',
		padding: 10,
		marginTop: 0,

		display: 'flex',
		justifyContent: 'space-between',
		maxWidth: 600,

		// margin: `2px ${theme.spacing(2)}px 2px 2px`,
	},
	commentDate: {
		display: 'block',
		float: 'top',

		color: 'gray',
		fontSize: '0.8em',
	},
	commentDelete: {
		color: '#fff',
		float: 'center',
		fontSize: '1.6em',
		verticalAlign: 'middle',
		cursor: 'pointer',
	},
}));

export default function Comments({ postId, user, commentId, comments }) {
	const classes = useStyles();
	const [text, setText] = useState('');

	// const [comments, setComments] = useState([]);

	// useEffect(() => {
	// 	db.collection('posts')
	// 		.doc(`${postId}`)
	// 		.collection('comments')
	// 		.onSnapshot((snapshot) => {
	// 			setComments(snapshot.docs.map((doc) => doc.data()));
	// 		});
	// }, [postId]);

	const addComment = (e) => {
		e.preventDefault();
		db.collection('posts')
			.doc(postId)
			.collection('comments')
			.add({
				userId: user.uid,
				text: text,
				username: user.displayName,
				postedAt: firebase.firestore.FieldValue.serverTimestamp(),
			})
			.then((data) => {
				// console.log('added comments');
				console.log(data.id);
				db.collection('posts')
					.doc(postId)
					.collection('comments')
					.doc(data.id)
					.update({ id: data.id });
			})
			.catch((err) => {
				alert(err);
			});
		setText('');
	};
	const handleChange = (event) => {
		setText(event.target.value);
	};

	const deleteComment = (item) => {
		console.log(item);
		db.collection('posts')
			.doc(postId)
			.collection('comments')
			.doc(item.id)
			.delete()
			.then((data) => {})
			.catch((err) => {
				alert(err);
			});
	};

	return (
		<div className={classes.root}>
			<CardHeader
				style={{ paddingRight: '4px', paddingLeft: '4px' }}
				title={
					<span
						style={{
							display: 'flex',
							alignItems: 'center',
							paddingRight: '0px',
						}}>
						<TextField
							fullWidth={true}
							multiline={true}
							value={text}
							onChange={handleChange}
							placeholder='Review area'
							className={classes.commentField}
							margin='normal'
							style={{ lineHeight: '5px' }}
							// onKeyPress={handleKeypress}
						/>
						<br />
						<IconButton onClick={addComment}>
							<SendSharpIcon
								color='primary'
								style={{
									display: 'inline-flex',
									float: 'center',

									cursor: 'pointer',
								}}
							/>
						</IconButton>
					</span>
				}
				className={classes.cardHeader}
			/>

			{comments !== [] &&
				comments.map((item) => {
					return (
						<div>
							{/* <CardHeader
								avatar={<Avatar className={classes.smallAvatar} />}
								className={classes.cardHeader}
								key={item.uid}
							/> */}
							<CardContent
								style={{
									margin: 0,
									paddingBottom: 0,
									paddingTop: 0,
									background: 'none',
								}}>
								<p className={classes.commentText}>
									<div
										style={{
											// display: 'inline-flex',
											textAlign: 'left',
											color: 'white',
											maxWidth: 400,
										}}>
										<div
											style={{
												display: 'flex',
												marginBottom: 5,
												textTransform: 'none',
											}}>
											<Avatar className={classes.smallAvatar} />
											&nbsp;
											<Link
												to={'/user/' + item.userId}
												style={{
													color: 'white',
													fontSize: 11,
													textAlign: 'center',
													padding: 2,
												}}>
												{item.username}
											</Link>
										</div>

										{/* <br /> */}
										<span style={{ minWidth: 300, maxHeight: 200 }}>
											{item.text}
										</span>
									</div>
									<div style={{ display: 'flex', verticalAlign: 'top' }}>
										<span
											className={classes.commentDate}
											style={{
												display: 'inline-flex',
												float: 'right',
												color: 'white',
											}}>
											{item.postedAt?.toDate().toDateString() +
												'  ' +
												item.postedAt?.toDate().toLocaleTimeString(undefined, {
													timezone: 'Asia/kolkata',
												})}
										</span>
										<br />
										<span>
											{auth.currentUser.uid === item.userId && (
												<IconButton
													className={classes.commentDelete}
													onClick={(e) => {
														e.preventDefault();
														console.log('Clicking delete');
														deleteComment(item);
													}}>
													<DeleteIcon />
												</IconButton>
											)}
										</span>
									</div>
								</p>
								<br />
							</CardContent>
						</div>
					);
				})}
		</div>
	);
}

// Comments.propTypes = {
// 	postId: PropTypes.string.isRequired,
// 	// comments: PropTypes.array.isRequired,
// 	updateComments: PropTypes.func.isRequired,
// };
