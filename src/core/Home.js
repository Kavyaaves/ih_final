import React from 'react';
import { createStyles, makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Left from './Left';
import Chip from '@material-ui/core/Chip';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import img from './static/photo.jpg';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
	return createStyles({
		root: {
			flexGrow: 1,
			display: 'flex',
			// flexDirection: 'row',
			overflow: 'hidden',
			margin: 'auto',
			background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
			marginLeft: 0,
		},
		root1: {
			margin: 'auto',
			padding: '1rem',
			minHeight: 600,
		},
		left: {
			'@media (max-width: 600px)': {
				display: 'none',
			},
			'@media (min-width: 768px)': {
				display: 'block',
			},
			marginTop: '2em',
			float: 'left',
			// marginRight: '20px',
			width: '20em',
		},
		typo1: {
			fontSize: '12px',
			borderRadius: '5px',
			fontWeight: 'bold',
		},
		typo2: {
			display: 'flex',
			width: '100%',
			padding: '5px',
		},
		cover: {
			overflow: 'hidden',
			width: '70%',
			margin: 'auto',
			height: 0,
			paddingTop: '55%', // 16:9,
			marginTop: '30',
			border: '1px solid blue',

			// height: 200,
			// maxWidth: '100%',
			// width: '75%',
			// float: 'right',
			// verticalAlign: 'right',
			// textAlign: 'right',
			// flexGrow: 1,
			// maxWidth: '100%',
			// height: 'auto',
			// display: 'flex',
			// marginBottom: -4,
		},
		rootRight: {
			margin: 'auto',
			marginTop: '2em',
			flexGrow: 1,
			// margin: 'auto',
			// border: '1px solid blue'
			[theme.breakpoints.up('sm')]: {
				maxWidth: 600,
			},
			overflow: 'hidden',
			margin: '10px',
			// border: '2px dashed #ccc',
			minHeight: '170px',
		},

		a: {
			'&:hover': {
				transform: 'scaleX(2)',
			},
		},
		chipDiv: {
			fontSize: 12,
			display: 'flex',
			alignItems: 'center',

			justifyContent: 'center',
			flexWrap: 'wrap',
			'& > *': {
				margin: theme.spacing(0.5),
			},
		},
		chip: {
			backgroundColor: '#424242',
			color: '#fff',
			'&:hover': {
				// background: fade(theme.palette.common.white, 0.7),
				backgroundColor: 'transparent',
				color: '#424242',
			},
			marginBottom: 2,
		},
		chipDiv: {
			'@media (max-width: 600px)': {
				display: 'block',
			},
			'@media (min-width: 600px)': {
				display: 'none',
			},
			backgroundColor: 'transparent',
			border: 'none',
			margin: 'auto',
		},
		card: {
			maxWidth: 1400,
			margin: 'auto',
			float: 'center',
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(3),
		},
	});
});

export default function Home(props) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Left
				className={classes.left}
				// user={props.user}
			/>

			<div className={classes.rootRight}>
				<div className={classes.chipDiv}>
					<Chip
						className={classes.chip}
						label='About Us'
						component='a'
						href='/'
						clickable
					/>
					&nbsp;
					<Chip
						className={classes.chip}
						label='Submit Papers'
						component='a'
						href='/submit'
						clickable
					/>
					&nbsp;
					<Chip
						className={classes.chip}
						label='Archives'
						component='a'
						href='/archives'
						clickable
					/>
					&nbsp;
					<Chip
						className={classes.chip}
						label='Instructions for Authors'
						component='a'
						href='/instruct'
						clickable
					/>
					&nbsp;
					<Chip
						className={classes.chip}
						label='Editorial Board'
						component='a'
						href='/editorial'
						clickable
					/>
					&nbsp;
					<Chip
						className={classes.chip}
						label='Submitted Papers'
						component='a'
						href='/list'
						clickable
					/>
					&nbsp;
					<Chip
						className={classes.chip}
						label='Users'
						component='a'
						href='/users'
						clickable
					/>
					&nbsp;
				</div>

				<Card style={{ marginTop: 10 }}>
					<div className={classes.root1}>
						<Typography
							className={classes.typo1}
							align='center'
							color='inherit'>
							Original Research/Review Articles are invited for Vol 20 (1&2) to
							be released as Prof. Krishnamurthy commemoration volume at the
							beginning of his birth centenary year in September, 2021. Last
							date for acceptance of articles: 28th February, 2021.
						</Typography>

						<Divider></Divider>
						<br></br>
						<Typography
							style={{
								fontWeight: 'bold',
								align: 'center',
								color: '#0000cd',
							}}
							variant='h5'>
							Founder
						</Typography>
						<br />
						<CardMedia
							className={classes.cover}
							image={img}
							title='Professor V. Krishnamurthy'
						/>
						<Box className={classes.typo2}>
							<Typography
								align='left'
								// display='inline-block'
								variant='body2'
								style={{
									fontSize: 11.5,
									lineHeight: 1.5,
									width: '100%',
									paddingTop: '30px',
									marginRight: '10px',
								}}>
								<span style={{ fontWeight: 'bold' }}>
									Indian Hydrobiology (ISSN 0971-6548),{' '}
								</span>
								was started by{' '}
								<a href='http://algologists.yolasite.com/tamil-nadu.php'>
									Professor V.Krishnamurthy
								</a>{' '}
								in the year 1995 with Volume No. 1 It publishes original
								research findings and review papers on all aspects of aquatic
								organisms in relation to environment and exploitation of these
								for the benefit of human beings. The journal, published one
								volume with two numbers a year, ips supplied free to the
								registered members of{' '}
								<a href='https://krishalgology.yolasite.com/'>
									Krishnamurthy Institute of Algology
								</a>{' '}
								, Chennai, India.
							</Typography>
							<div
								style={{
									lineHeight: '1.5em',
									display: 'inline-flex',
									padding: '5px',
								}}></div>
						</Box>
						<br />
						<Divider></Divider>
					</div>
				</Card>
			</div>
		</div>
	);
}
