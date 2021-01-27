import React, { useContext } from 'react';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Chip from '@material-ui/core/Chip';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { UserContext } from '../providers/UserProvider';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: '31px',
		maxWidth: 400,
		marginRight: 0,
		float: 'left',
		// background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
	},

	card: {
		margin: 'auto',
		float: 'right',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		marginRight: theme.spacing(2),
		marginLeft: theme.spacing(5),
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block',
		},
	},
}));

export default function Left() {
	const classes = useStyles();
	const user = useContext(UserContext);

	return (
		<div className={classes.root}>
			<Card className={classes.card}>
				<List aria-label='Head 1' className={classes.left}>
					<Link to='/'>
						<ListItem button>
							<ListItemText primary='About Us' />
						</ListItem>
					</Link>
					<Divider />
					<Link to='/archives'>
						<ListItem button>
							<ListItemText primary='Archives' />
						</ListItem>
					</Link>
					<Divider />
					<Link to='/submit'>
						<ListItem button>
							<ListItemText primary='Submit Papers' />
						</ListItem>
					</Link>
					<Divider />
					<Link to='/instruct'>
						<ListItem button>
							<ListItemText primary='Instructions for authors' />
						</ListItem>
					</Link>
					<Divider />
					<Link to='/editorial'>
						<ListItem button>
							<ListItemText primary='Editorial Board' />
						</ListItem>
					</Link>

					{user?.role === ('Admin' || 'Reviewer') && (
						<div>
							<Divider />
							<Link to='/list'>
								<ListItem button>
									<ListItemText primary='Submitted papers' />
								</ListItem>
							</Link>
						</div>
					)}
					{user?.role === 'Admin' && (
						<div>
							<Divider />
							<Link to='/users'>
								<ListItem button>
									<ListItemText primary='Users' />
								</ListItem>
							</Link>
						</div>
					)}
				</List>
			</Card>
		</div>
	);
}
