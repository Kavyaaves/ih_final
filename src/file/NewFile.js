import axios from 'axios';
import React, { useState, useRef } from 'react';
import LinearProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';
// import logo from '../logo.svg';
// import '../style/App.css';
import crypto from 'crypto';
import { db, storage } from '../firebase';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dropzone from 'react-dropzone';
// import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
// import fileCamera from '@material-ui/icons/fileCamera'
import firebase from 'firebase';
const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 600,
		margin: 'auto',
		textAlign: 'center',
		paddingBottom: theme.spacing(0),
		padding: 0,
		marginTop: 0,
	},

	accept: {
		border: '#107c10',
	},

	reject: {
		border: '#d83b01',
	},
	error: {
		verticalAlign: 'middle',
	},
	title: {
		marginTop: theme.spacing(2),
		color: theme.palette.openTitle,
		paddingTop: 0,
	},
	textField: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		width: 300,
	},
	submit: {
		margin: 'auto',
		marginBottom: theme.spacing(2),
	},
	drop: {
		minHeight: 200,
		border: '2px dotted grey',
	},
}));

const NewFile = (props) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [files, setFiles] = useState([]);
	const [values, setValues] = useState({ accFiles: [] });
	const [url, setUrl] = useState('');
	const [urls, setUrls] = useState([]);
	const [progress, setProgress] = useState([]);
	const [fileNames, setFileNames] = useState([]);
	const [present, setPresent] = useState(false);
	// const fileChanged = (event) => {
	// 	setFiles(event.target.files);
	// 	console.log(files);
	// };

	// this.loadFiles = this.loadFiles.bind(this);

	const handleDrop = (acceptedFiles) => {
		setFiles(acceptedFiles);
		setFileNames(acceptedFiles.map((file) => file.name));
	};

	const uploadFile = async (event) => {
		event.preventDefault();
		const acc = [];

		// files.map(async (file) => {
		// 	const fileRef = storage.ref('files');
		// 	fileRef
		// 		.child(file.name)
		// 		.getMetadata()
		// 		.then((metadata) => {
		// 			setOpen(false);
		// 			alert(`Try changing the name of the file ${metadata.name}`);
		// 		})
		// 		.catch(() => {
		// 			acc.push(file);
		// 		});
		// });
		const postid = crypto.randomBytes(16).toString('hex');

		const posts = [];
		files?.forEach((file) => {
			const uploadTask = firebase
				.storage()
				.ref(`files/${postid}${file.name}`)
				.put(file);
			uploadTask.on(
				'state_changed',
				(snapshot) => {
					// progress function ...
					const progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					// Error function ...
					alert('Error while uploading files');
					console.log(error);
				},
				() => {
					// complete function ...
					const storageRef = firebase
						.storage()
						.ref('files')
						.child(`${postid}${file.name}`);
					storageRef.getDownloadURL().then((url) => {
						posts.push({ filename: file.name, url: url });
						db.doc(`posts/${postid}`).set(
							{
								files: [...posts],
							},
							{ merge: true }
						);
					});
				}
			);
			console.log(props.user.displayName);
			db.doc(`posts/${postid}`).set(
				{
					userId: props.user.uid,
					label: 'Submitted',
					username: props.user.displayName,
					timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				},
				{ merge: true }
			);
			setProgress(0);
			setFiles(null);
			setOpen(true);
		});
	};

	return (
		<div
			style={{
				backgroundColor: '#efefef',
				// padding: `${theme.spacing(3)}px 0px 1px`,
			}}>
			<Card
				style={{
					minWidth: 600,
					minHeight: 200,
					margin: 'auto',
					fontSize: 14,
					// marginBottom: theme.spacing(3),
					// backgroundColor: 'rgba(65, 150, 136, 0.09)',
					boxShadow: 'none',
				}}>
				<CardHeader
					// avata
					// r={<Avatar src={fileURL} />}
					// title={values.user.name}
					style={{ paddingTop: 8, paddingBottom: 8 }}></CardHeader>
				<Typography
					variant='h6'
					style={{ margin: 'auto', textAlign: 'center' }}>
					Submit Papers
				</Typography>
				<CardContent
					style={{
						backgroundColor: 'white',
						paddingTop: 0,
						paddingBottom: 0,
						minHeight: 250,
					}}>
					<br />
					<br />
					{/* <progress
						style={{ width: '100%', color: '#424242' }}
						value={progress}
						max='100'
					/> */}

					<Dropzone onDrop={handleDrop} className='dropzone'>
						{({
							getRootProps,
							getInputProps,
							isDragActive,
							isDragAccept,
							isDragReject,
						}) => {
							return (
								<div
									{...getRootProps({})}
									style={{
										border: '2px dotted grey',
										minHeight: 100,
										textAlign: 'center',
										paddingTop: 25,
									}}>
									<input {...getInputProps()} />
									<span>
										<CloudUploadIcon></CloudUploadIcon>
									</span>
									<p>Drag and drop files, or click to select files</p>
								</div>
							);
						}}
					</Dropzone>
					<br />
					{!files && <Typography>No files selected</Typography>}
					{files && (
						<div>
							<strong>Selected Files:</strong>
							<ul>
								{fileNames?.map((fileName) => (
									<li key={fileName}>{fileName}</li>
								))}
							</ul>
						</div>
					)}
					{/* <div>
						<form
							style={{ alignItems: 'center', textAlign: 'center' }}
							method='POST'
							encType='multipart/form-data'>
							<div>
								<label
									for='file'
									style={{
										backgroundColor: 'black',
									}}>
									<input
										style={{ borderBox: 'none', backgroundColor: 'black' }}
										multiple={true}
										type='file'
										name='file'
										id='file'
										onChange={fileChanged}
										placeholder='	Upload Files'
									/>
									Upload
								</label>
							</div>
						</form> */}
					{/* <div style={{}}>
								<h2>Selected Files</h2>
								<ul></ul>
							</div> */}
					{/* <LinearProgress variant='determinate' value={progress} /> */}
					{/* </div> */}
				</CardContent>
				{/* <progress style={{ width: '100%', color: '#424242' }} value={progress} max='100' /> */}
				<CardActions>
					{' '}
					<Button
						color='primary'
						variant='contained'
						disabled={files?.length === 0}
						onClick={uploadFile}
						style={{
							margin: 'auto',
							textAlign: 'center',
							alignItems: 'center',
						}}>
						Submit
					</Button>
				</CardActions>
			</Card>

			<Dialog open={open} disableBackdropClick={true}>
				<DialogTitle>Paper Submission</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Your paper is submitted successfully
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link to='/'>
						<Button color='primary' autoFocus='autoFocus' variant='contained'>
							Ok
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default NewFile;

// {
/* <tbody>
							{files.map((file, index) => {
								var d = new Date(file.uploadDate);
								return (
									<tr key={index}>
										<td>
											<a
												href={`http://localhost:8080/api/files/${file.filename}`}>
												{file.filename}
											</a>
										</td>
										<td>{`${d.toLocaleDateString()} ${d.toLocaleTimeString()}`}</td>
										<td>{Math.round(file.length / 100) / 10 + 'KB'}</td>
										<td>
											<button
												onClick={this.deleteFile.bind(this)}
												id={file._id}>
												Remove
											</button>
										</td>
									</tr>
								);
							})}
						</tbody> */
// }
// 		</table>
// 	</div>
// </div>
