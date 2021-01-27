import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import NewFile from '../file/NewFile';
import { UserContext } from '../providers/UserProvider';
import { Link, Redirect, withRouter } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		margin: 'auto',
		// border: '1px solid blue',

		[theme.breakpoints.up('sm')]: {
			maxWidth: 600,
		},
	},
	home: {
		flexGrow: 1,
		display: 'flex',
		flexDirection: 'row',
		overflow: 'hidden',
		margin: 'auto',
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
	},

	card: {
		maxWidth: 1400,
		margin: 'auto',
		float: 'center',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
}));

const SubmitPaper = () => {
	const classes = useStyles();
	const user = useContext(UserContext);

	return (
		<div className={classes.home}>
			<div className={classes.root}>
				<Card className={classes.card}>
					<NewFile user={user} />
				</Card>
			</div>
		</div>
	);
};
export default withRouter(SubmitPaper);
