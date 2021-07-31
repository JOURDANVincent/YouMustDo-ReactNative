import {actionTypes} from '../constants/actionTypes';


export function userReducer(state, action) {

	switch (action.type) {

		// INSCRIPTION //
		case actionTypes.SIGN_UP: {
			return {
				...state,
				error: action.error,
				userId: action.userId,
				userData : action.userData,
				isLoading: action.isLoading
			};
		}

		// CONNEXION //
		case actionTypes.SIGN_IN: {
			return {
				...state,
				error: action.error,
				userId: action.userId,
				userData : action.userData,
				isLoading: action.isLoading
			};
		}

		// DECONNEXION //
		case actionTypes.SIGN_OUT: {
			return {
				...state,
				error: null,
				userId: null,
				userData : [],
				isLoading: false
			};
		}
		
		// DEFAUT //
		default:
			return state;
	}
}