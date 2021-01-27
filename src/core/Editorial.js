import React from 'react';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles((theme) => ({
	root: {
		background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
		flexGrow: 1,
		margin: 'auto',
		fontFamily: 'Open Sans, Helvetica',
		// border: '1px solid blue',

		width: '100%',
		minHeight: '700px',
		fontSize: '11px',
	},

	card: {
		// background: 'linear-gradient(to bottom, #a8c0ff, #3f2b96)',
		[theme.breakpoints.up('sm')]: {
			maxWidth: 600,
		},
		minHeight: 600,
		padding: '25px',
		margin: 'auto',
		float: 'center',
		margin: 'auto',
		// marginTop: theme.spacing(3),
		// marginBottom: theme.spacing(3),
		// fontWeight: 'bold',
		// fontFamily: 'Open Sans, sans-serif',
	},

	chief: {
		fontSize: '11px',
		margin: 'auto',
		// fontWeight: 'bold',
		textAlign: 'center',
	},

	mem: {
		float: 'left',
		fontSize: 11,
		padding: '20px',
	},

	divider: {
		color: '#424242',
		height: '100%',
	},
}));

const Editorial = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<div>
				<Card className={classes.card}>
					<Typography variant='h6' style={{ textAlign: 'center' }}>
						Editorial Board
					</Typography>
					<br></br>
					<div className={classes.chief}>
						<Typography
							variant='body'
							style={{ fontWeight: 'bold', fontSize: '14px' }}>
							Chief Editor
						</Typography>
						<br></br>
						<Typography variant='body'>
							Dr.M.Baluswami <br />
							President, Krishnamurthy Institute of Algology <br />
							Former Director, Shift II, Self Financed Stream (June 2016-May
							2019)
							<br />
							Madras Christian College, Chennai-600 059 <br />
							Former Associate Professor and Head (June 2013-May 2016)
							<br /> Department of Botany Madras Christian College, Chennai-600
							059 <br />
							<span style={{ display: 'flex', marginLeft: 250 }}>
								<MailIcon />
								&nbsp; balumcc@gmail.com
							</span>
							<br />
						</Typography>
						<br />
					</div>
					<Divider />
					<br />
					<div className={classes.mem} style={{ display: 'flex' }}>
						<div
							style={{
								flexDirection: 'row',
								fontSize: 11,
								textAlign: 'center',
							}}>
							<div style={{ minWidth: 250 }}>
								<Typography variant='body'>
									<span>Prof.S.P.Adhikary </span>
									<br></br>
									(Ex. Vice-Chancellor, FM University, Odisha)<br></br>
									Department of Biotechnology <br></br>
									Visva-Bharati (a Central University) <br></br>
									Santiniketan-731 235 <br></br>
									<span style={{ display: 'flex', marginLeft: 60 }}>
										<MailIcon />
										&nbsp; adhikarysp@gmail.com
									</span>
									<br></br>
								</Typography>
								<br />
								<br />
								<Typography variant='body'>
									Prof.R. Rengasamy <br />
									Fmr. Director
									<br />
									CAS in Botany
									<br />
									Guindy Campus, University of Madras,
									<br />
									Chennai-600 025
									<br />
									<span style={{ display: 'flex', marginLeft: 60 }}>
										<MailIcon />
										&nbsp; profrrengasamy@gmail.com
									</span>
									<br />
								</Typography>
								<br />
								<br />
								<Typography variant='body'>
									Dr.Hanumantha Rao <br />
									Polur Department of Microbiology <br />
									Madras Christian College Chennai-600 059
									<br />
									<Typography
										style={{
											marginLeft: 60,
											display: 'flex',
											alignItems: 'center',
										}}>
										<MailIcon style={{ float: 'center' }} />{' '}
										&nbsp;dr.phrao@gmail.com
									</Typography>
									<br />
								</Typography>
								<br />
								<br />
								<Typography variant='body'>
									Dr.Bakthavatchalam Babu <br /> Department of Botany
									<br /> Madras Christian College Chennai-600 059
									<br />{' '}
									<span style={{ display: 'flex', marginLeft: 55 }}>
										<MailIcon />
										&nbsp; bbabu2k5@gmail.com
									</span>
									<br />
								</Typography>
							</div>
							<br />
						</div>
						<Divider orientation='vertical' className={classes.divider} />
						<div
							style={{
								flexDirection: 'row',
								textAlign: 'center',
								marginLeft: '100px',
							}}>
							<Typography variant='body'>
								Prof.B.B.Chaugule <br />
								Retd. Head, Dept. of Botany
								<br /> University of Pune <br />
								Res.Building No.2, Block No.3 Chaitanya Housing Society <br />
								Senapati Bapat Road, Pune-411 016
								<br />{' '}
								<span style={{ marginLeft: 60, display: 'flex' }}>
									<MailIcon />
									&nbsp; profbbc@gmail.com
								</span>
								<br />
							</Typography>{' '}
							<br />
							<br />
							<Typography variant='body'>
								Dr. S. Bharathan <br />
								Fmr. Professor of Botany
								<br /> Pachiyappa’s College,
								<br />
								Chennai-600 034 <br />
								<span style={{ marginLeft: 30, display: 'flex' }}>
									<MailIcon />
									&nbsp; anitabharathan@yahoo.com
								</span>
								<br />
							</Typography>
							<br />
							<br />
							<Typography variant='body'>
								Dr.J.Logamanya Tilak <br />
								Department of Zoology <br />
								Madras Christian College
								<br /> Chennai-600 059
								<br />
								<div style={{ marginLeft: 50, display: 'flex' }}>
									<MailIcon />
									&nbsp; mcctilak@gmail.com
								</div>
								<br />
							</Typography>
						</div>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default Editorial;
