const { db } = require('../admin/admin');

exports.getAllPosts = (request, response) => {
	const todos = [
		{
			id: '1',
			title: 'greeting',
			body: 'Hello world from sharvin shah',
		},
		{
			id: '2',
			title: 'greeting2',
			body: 'Hello2 world2 from sharvin shah',
		},
	];
	return response.json(todos);
};
// 		)
// 		.catch((err) => {
// 			console.error(err);
// 			return response.status(500).json({ error: err.code });
// 		});
// };

exports.postOnePost = (request, response) => {
	if (request.body.body.trim() === '') {
		return response.status(400).json({ body: 'Must not be empty' });
	}

	if (request.body.title.trim() === '') {
		return response.status(400).json({ title: 'Must not be empty' });
	}

	const newPostItem = {
		title: request.body.title,
		body: request.body.body,
		username: request.user.username,
		createdAt: new Date().toISOString(),
	};
	db.collection('Posts')
		.add(newPostItem)
		.then((doc) => {
			const responsePostItem = newPostItem;
			responsePostItem.id = doc.id;
			return response.json(responsePostItem);
		})
		.catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

exports.deletePost = (request, response) => {
	const document = db.doc(`/posts/${request.params.postId}`);
	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({ error: 'Post not found' });
			}
			if (doc.data().username !== request.user.username) {
				return response.status(403).json({ error: 'UnAuthorized' });
			}
			return document.delete();
		})
		.then(() => {
			response.json({ message: 'Delete successfull' });
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code });
		});
};

exports.editPost = (request, response) => {
	if (request.body.postId || request.body.createdAt) {
		response.status(403).json({ message: 'Not allowed to edit' });
	}
	let document = db.collection('Posts').doc(`${request.params.postId}`);
	document
		.update(request.body)
		.then(() => {
			response.json({ message: 'Updated successfully' });
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({
				error: err.code,
			});
		});
};
