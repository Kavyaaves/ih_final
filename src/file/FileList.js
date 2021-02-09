import PropTypes from 'prop-types';
import File from './File';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { db } from '../firebase';
const useStyles = makeStyles({
	card: {
		minHeight: 50,
		maxWidth: 600,
		margin: 'auto',
		marginBottom: 20,
	},
	root: {
		minHeight: 400,
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
	},
});

export default function FileList(props) {
	const classes = useStyles();
	const [filesList, setFilesList] = useState([]);
	const [errorMsg, setErrorMsg] = useState('');
	// const user = props.location.state.user;

	useEffect(() => {
		const docRef = db.collection('posts');
		const postData = [];
		const post = [];
		const commentsData = [];

		docRef.orderBy('timestamp', 'asc').onSnapshot(async (snapshot) => {
			const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
			snapshot.forEach((doc) => {
				const comments = docRef.doc(`${doc.id}`).collection('comments');
				comments.onSnapshot((snapshot) => {
					snapshot.forEach((doc) => {
						commentsData.push({ ...doc.data(), id: doc.id });
					});
				});

				console.log(commentsData);

				postData.push({
					...doc.data(),
					id: doc.id,
					comments: commentsData,
				});
			});
			await waitFor(500);

			console.log(postData);

			setFilesList(postData);
		});
	}, [filesList.length]);

	console.log(filesList);
	const removePost = async (post) => {
		// const updatedPosts = [...filesList];
		const index = filesList.indexOf(post);

		filesList.splice(index, 1);
		const waitFor = (ms) => new Promise((r) => setTimeout(r, ms));
		await waitFor(50);
		// await setFilesList(updatedPosts);
	};
	return (
		<div className={classes.root}>
			<br />
			<div style={{ minHeight: '15px', textAlign: 'center' }}>
				{(filesList.length === 0 && (
					<Typography
						style={{
							margin: 'auto',
							textAlign: 'center',
							fontSize: 'large',
						}}>
						No papers submitted
					</Typography>
				)) ||
					(filesList && (
						<span fontSize='small'>Papers Recieved: {filesList.length}</span>
					))}
			</div>
			<br />
			{filesList.map((item, i) => {
				return <File file={item} key={i} removeUpdate={removePost} />;
			})}{' '}
		</div>
	);
}
