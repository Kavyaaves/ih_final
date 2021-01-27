import React, { Component, createContext } from 'react';
import { auth, db } from '../firebase';
import { generateUserDocument } from '../components/Signup';

export const UserContext = createContext({ user: null });

class UserProvider extends Component {
	state = {
		user: null,
		posts: [],
	};

	componentDidMount = async () => {
		auth.onAuthStateChanged(async (userAuth) => {
			const user = await generateUserDocument(userAuth);
			this.setState({ user });
		});
		db.collection('posts')
			.orderBy('timestamp', 'desc')
			.onSnapshot((snapshot) =>
				this.setState({
					posts: snapshot.docs.map((doc) => ({ id: doc.id, post: doc.data() })),
				})
			);
	};
	// componentDidMount = async () => {
		
	// };

	render() {
		return (
			<UserContext.Provider value={this.state.user}>
				{this.props.children}
			</UserContext.Provider>
		);
	}
}

export default UserProvider;
