import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import { Link, Route, Switch } from 'react-router-dom';
import NewArchives from './NewArchives';
import { auth, db, storage } from '../firebase';
import ViewArchive from './ViewArchive';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
		minHeight: 350,
		textAlign: 'center',
	},
	paper: {
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
		margin: 'auto',
		padding: '1rem',
	},
	row: {
		padding: 10,
	},
	cell: {
		padding: 10,
	},

	div: {
		width: 500,
		height: 400,
		overflow: 'auto',
		margin: 'auto',
		border: '2px solid black',
	},
}));

// const docRef = db.collection('posts');
// console.log(docRef);

// docRef.onSnapshot((snapshot) => {
// 	const postData = [];
// 	snapshot.forEach((doc) => postData.push({ ...doc.data(), id: doc.id }));
// 	setFilesList(postData);
// });

const Archives = (props) => {
	const classes = useStyles();
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
	}, []);

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
						Welcome to Archives Hub
					</Typography>
					{/* <ViewArchive /> */}
					<br />
					<br />
					<div className={classes.div}>
						{/* <Typography variant='body'>Volume 1</Typography>
								<ListItem>
									{' '}
									<Link to='/1.1'>Issue 1</Link>&nbsp;
								</ListItem>
								<Divider orientation='vertical' />
								<ListItem>
									{' '}
									<Link to='/1.2'>Issue 2</Link>&nbsp;
								</ListItem>
								<Divider></Divider> */}

						{/* Vol 2<Link to='/1.1'>Issue 1</Link>
						<Link to='/1.1'>Issue 1</Link>
						Vol 3<Link to='/1.1'>Issue 1</Link>
						<Link to='/1.1'>Issue 1</Link> */}

						<Table className={classes.table} aria-label='simple table'>
							<TableBody style={{ paddingRight: 10 }}>
								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 5
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='5.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/5.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 4
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='4.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/4.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 3
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='3.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/3.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 2
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/2.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/2.1'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 1
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/1.1'>Issue 1</Link>
										&nbsp; (September 1995)
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/1.2'>Issue 2</Link>
										&nbsp; (June 1996)
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 1
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='1.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/archives/1.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 1
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='1.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/archives/1.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 1
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='1.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/archives/1.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 1
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='1.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/archives/1.2'>Issue 2</Link>
									</TableCell>
								</TableRow>

								<TableRow className={classes.row}>
									<TableCell className={classes.cell} align='center'>
										Volume 1
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='1.1'>Issue 1</Link>
									</TableCell>
									<TableCell className={classes.cell} align='center'>
										<Link to='/archives/1.2'>Issue 2</Link>
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
					<br />
				</Paper>
			</div>
			<br />
		</div>
	);
};

export default Archives;
