const functions = require('firebase-functions');
const app = require('express')();
// const auth = require('./admin/auth')();

const {
	getAllPosts,
	postOnePost,
	deletePost,
	editPost,
} = require('./api/posts');

const {
	loginUser,
	signUpUser,
	uploadProfilePhoto,
	getUserDetail,
	updateUserDetails,
} = require('./api/users');

// Users
// app.post('/login', loginUser);
// app.post('/signup', signUpUser);
// app.post('/user/image', auth, uploadProfilePhoto);
// app.get('/user', auth, getUserDetail);
// app.post('/user', auth, updateUserDetails);
// // Posts
app.get('/posts', getAllPosts);
// // app.get('/Post/:PostId', auth, getOnePost);
// app.post('/Post', auth, postOnePost);
// app.delete('/Post/:PostId', auth, deletePost);
// app.put('/Post/:PostId', auth, editPost);

exports.api = functions.https.onRequest(app);
