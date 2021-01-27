import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyDt_TLBrI9TCkyc_uUZ97qnfd2WKln9EGE',
	authDomain: 'indian-hydrobiology.firebaseapp.com',
	projectId: 'indian-hydrobiology',
	storageBucket: 'indian-hydrobiology.appspot.com',
	messagingSenderId: '710472888144',
	appId: '1:710472888144:web:164e356cee6a171992c655',
	measurementId: 'G-77DVMNQFPV',
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
// const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = () => {
// 	auth
// 		.signInWithPopup(provider)
// 		.then(function (result) {
// 			var user = result.user;
// 			if (user.displayName === null) {
// 				auth.signOut();
// 				alert('Sign Up');
// 			}
// 		})
// 		.catch(function (error) {
// 			// var errorCode = error.code;
// 			// var errorMessage = error.message;

// 			console.log(error.code);
// 			console.log(error.message);
// 		});
// };
// export const generateUserDocument = async (user, additionalData) => {

// };

export default firebase;
