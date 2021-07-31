import Realm from "realm";
import openRealm from '../database/OpenRealm'
import {ObjectId} from 'bson';

// KEY CHAIN //
import * as Keychain from 'react-native-keychain';


export function getUserActions(app, dispatch) {

	return {

		// CONNEXION //
		signIn: async data => {

			const {email, password} = data;
			const credentials = Realm.Credentials.emailPassword(email, password);

			try {

				dispatch({type: 'SIGN_IN', isLoading: true});
				const user = await app.logIn(credentials);
				console.log('successfully logged in ', user.id);

				realm = await openRealm(user) // on récupère la base associé à l'utilisateur
				const userData = realm.objects('User')
				const userVisibleData = { _id: userData[0]._id, email: userData[0].email, lastname: userData[0].lastname, firstname: userData[0].firstname}

				dispatch({type: 'SIGN_IN', userId: user.id, userData: userVisibleData, isLoading: false});
				
			} catch (error) {
				console.log(
					"l'authentification a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_IN', error: error.message});
			}
		},

		// DECONNEXION //
		signOut: async () => {

			try {
				// suppression du keychain enregistré //
				// await Keychain.resetGenericPassword(); //pbm gestion deconnexion / suppression empreinte

				await app.currentUser.logOut();
				console.log('successfully unlogged');
				dispatch({type: 'SIGN_OUT'});

			} catch (error) {
				console.log(
					"la deconnexion a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_OUT', error: error.message});
			}
		},

		// INSCRIPTION //
		signUp: async data => {

			const  {email, password, lastname, firstname, touchId } = data;

			// si connexion par empreinte activé, crétion du keychain //
            let newKey = touchId ? await Keychain.setGenericPassword(email, password) : null
			console.log('newKey', newKey)

			try {

				dispatch({type: 'SIGN_UP', isLoading: true});
				await app.emailPasswordAuth.registerUser(email, password);
				const credentials = Realm.Credentials.emailPassword(email, password);
				const user = await app.logIn(credentials);
				console.log('l\'inscription effectuée avec succès !!', user.id)

				realm = await openRealm(user) // on récupère la base associé à l'utilisateur

				realm.write(() => {

					console.log('trying to add user data in User table..', data)
	
					realm.create("User", {
		
						_id: ObjectId(user.id),
						email: email,
						password: password, 
						lastname: lastname,
						firstname: firstname,
						partitionKey: String(user.id)
		
					}, 'modified');
				});
				
				const userData = realm.objects('User')
				const userVisibleData = { _id: userData[0]._id, email: userData[0].email, lastname: userData[0].lastname, firstname: userData[0].firstname}
				console.log('new user data is added in DB !!') 

				dispatch({type: 'SIGN_UP', userId: user.id, userData: userVisibleData, isLoading: false});

			} catch (error) {
				console.log(
					"l'inscription a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SIGN_UP', error: error.message});
			}
		},

		// ACK ERREUR //
		ackErrorLog: async () => {

			try {

				dispatch({type: 'ACK_ERROR_LOG', error: null});
				console.log('erreur acquitée')

			} catch (error) {
				console.log(
					"l'acquittement a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'ACK_ERROR_LOG', error: error.code});
			}
		},

		// // GET USER DATA //
		// getErrorLog= () => {

		// 	try {

		// 		dispatch({type: 'SIGN_UP', error: null});
		// 		console.log('erreur acquitée')

		// 	} catch (error) {
		// 		console.log(
		// 			"l'acquittement a échouée avec l'erreur : ",
		// 			error.code,
		// 			error.message,
		// 		);
		// 		dispatch({type: 'SIGN_UP', error: error.code});
		// 	}
		// }
	};
}
