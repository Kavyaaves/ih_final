import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { Link, Route } from 'react-router-dom';
import NewArchives from './NewArchives';

import { auth, db, storage } from '../firebase';
// import { Divider } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(5),
		minHeight: 350,
		textAlign: 'center',
	},
	paper: {
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
		margin: 'auto',
	},

	div: {
		maxWidth: 500,
		minHeight: 350,
		margin: 'auto',
		textAlign: 'left',
		border: '2px solid black',
	},
	card: {
		marginBottom: 12,
	},
	download: {
		float: 'right',
		padding: '4px 8px',
	},
	abstract: {
		textAlign: 'left',
	},
}));

// const docRef = db.collection('posts');
// console.log(docRef);

// docRef.onSnapshot((snapshot) => {
// 	const postData = [];
// 	snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
// 	setFilesList(postData);
// });

const ViewArchive = ({ match }) => {
	const classes = useStyles();
	const [issue, setIssue] = useState(null);
	const [url, setUrl] = useState(null);
	useEffect(() => {
		// const storageRef = storage.ref('archives');
		// storageRef
		// 	.child('1.1')
		// 	.listAll()
		// 	.then(function (res) {
		// 		res.prefixes.forEach(function (folderRef) {
		// 			console.log(folderRef);
		// 			// All the prefixes under listRef.
		// 			// You may call listAll() recursively on them.
		// 		});
		// 		res.items.forEach(function (itemRef) {
		// 			console.log(itemRef);
		// 			// All the items under listRef.
		// 		});
		// 	})
		// 	.catch(function (error) {
		// 		alert(error);
		// 		// Uh-oh, an error occurred!
		// 	});
		db.collection('archives')
			.doc('pbzmDvPmdAUesW3GkUbJ')
			.collection(match.params.name)
			.onSnapshot((snapshot) => {
				const postData = [];
				snapshot.forEach((doc) => {
					postData.push({ ...doc.data(), id: doc.id });
					// paperData.push({ ...doc.data().papers });
				});
				// console.log(snapshot);
				// paperData.map((pap) => setPaper(pap));
				postData.map((post) => setIssue(post));
			});
	}, []);
	console.log(issue);
	// const { papers } = issue;
	// console.log(paper);

	const handleDownload = async (filename) => {
		// alert(filename);
		const storageRef = storage
			.ref(`archives/${match.params.name}`)
			.child(`${filename}.pdf`);
		const url = storageRef.getDownloadURL().then((url) => {
			return url;
		});
		return url;
	};

	return (
		<div
			style={{
				background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
				marginTop: 0,
				minHeight: 350,
			}}>
			<div>
				<Paper className={classes.root} elevation={4}>
					{/* <Card> */}
					<Typography variant='h6' component='h2' style={{ color: 'red' }}>
						Volume 1 / Issue 1
					</Typography>
					<Typography color='textSecondary' gutterBottom>
						Published: September 1995
					</Typography>
					<br></br>
					{issue &&
						issue.papers?.map((doc, i) => {
							return (
								<Card className={classes.card}>
									<CardContent>
										<Typography variant='body1'>{doc.title}</Typography>
										<div
											style={{
												display: 'flex',
												justifyContent: 'space-between',
												margin: '2px 15px',
											}}>
											<Typography
												color='textSecondary'
												variant='body2'
												gutterBottom>
												Authors:
											</Typography>
											<Button
												color='primary'
												variant='contained'
												className={classes.download}
												onClick={async (e) => {
													e.preventDefault();
													const url = await handleDownload(doc.filename);
													setUrl(url);
													window.open(url);
													setUrl(null);
												}}>
												<CloudDownloadIcon />
												<span style={{ fontSize: 8 }}>&nbsp; Download</span>
											</Button>
										</div>
										<Typography
											variant='body2'
											component='p'
											className={classes.abstract}>
											<br />

											{doc.abstract}
										</Typography>
										<br />
									</CardContent>
								</Card>
							);
						})}

					<br />
					<br />
				</Paper>
				{url && console.log(url)}
				{/* {url && (
					
				)} */}
			</div>
		</div>
	);
};

export default ViewArchive;
