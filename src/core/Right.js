import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import About from './About';
const useStyles = makeStyles((theme) => ({}));

export default function Right() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<About />
			</Card>
		</div>
	);
}
