import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 600,
		margin: 'auto',
		padding: theme.spacing(3),
		minHeight: 350,
		textAlign: 'center',
	},
}));

const NewArchives = () => {
	const classes = useStyles();
	const [values, setValues] = useState({
		issue: '',
		title: '',
		nauthors: '',
		authors: [],
		open: false,
		error: '',
		pages: '',
		price: '',
		file: '',
		published: '',
		showDiv: false,
	});

	const handleChange = (name) => (event) => {
		if (name === 'nauthors') values.showDiv = true;
		setValues({ ...values, [name]: event.target.value });
		console.log(values);
	};

	const handleFileChange = (e) => {
		setValues({ ...values, file: e.target.file });
	};

	return (
		<div
			style={{
				background: 'linear-gradient(to left, #c9d6ff, #e2e2e2)',
				marginTop: 0,
				minHeight: 350,
			}}>
			<Paper className={classes.root} elevation={4}>
				<Typography variant='h6' className={classes.title}>
					Archive
				</Typography>
				<TextField
					id='title'
					label='Title'
					className={classes.textField}
					value={values.title}
					onChange={handleChange('title')}
					margin='normal'
				/>
				<br />
				<FormControl className={classes.formControl}>
					<InputLabel shrink id='demo-simple-select-placeholder-label-label'>
						Issue
					</InputLabel>
					<Select
						labelId='demo-simple-select-placeholder-label-label'
						id='demo-simple-select-placeholder-label'
						onChange={handleChange('issue')}>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
					</Select>
				</FormControl>
				&nbsp; &nbsp; &nbsp; &nbsp;
				<FormControl className={classes.formControl}>
					<InputLabel shrink id='demo-simple-select-placeholder-label-label'>
						Authors
					</InputLabel>
					<Select
						labelId='demo-simple-select-placeholder-label-label'
						id='demo-simple-select-placeholder-label'
						value={values.nauthors}
						onChange={handleChange('nauthors')}>
						<MenuItem value={1}>1</MenuItem>
						<MenuItem value={2}>2</MenuItem>
						<MenuItem value={3}>3</MenuItem>
						<MenuItem value={4}>4</MenuItem>
						<MenuItem value={5}>5</MenuItem>
					</Select>
				</FormControl>
				<br />
				{values.showDiv &&
					[...Array(values.nauthors)].map((e, i) => (
						<TextField
							className={classes.authors}
							key={i}
							label={'Author ' + (i + 1)}
							value={values.authors}
							onChange={() => handleChange('authors')}
							margin='normal'
						/>
					))}
				<input type='file' name='file' onChange={handleFileChange} />
			</Paper>
		</div>
	);
};

export default NewArchives;
