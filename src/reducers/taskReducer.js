import {actionTypes} from '../constants/actionTypes';


export function taskReducer(state, action) {

	switch (action.type) {

		case actionTypes.ADD_TASK: {
			return {
				...state,
				error: action.error,
				taskData: [...state.taskData, action.taskData],
				isLoading: action.isLoading,
			};
		}

		case actionTypes.GET_TASK: {
			return {
				...state,
				error: action.error,
				taskData: [...state.taskData, action.taskData],
				isLoading: action.isLoading,
			};
		}

		case actionTypes.SET_TASK_STATUS: {
			return {
				...state,
				error: action.error,
				taskData: [...state.taskData, action.taskData],
				isLoading: action.isLoading,
			};
		}

		case actionTypes.SET_TASK: {
			return {
				...state,
				error: action.error,
				taskData: [...state.taskData, action.taskData],
				isLoading: action.isLoading,
			};
		}

		case actionTypes.DEL_TASK: {
			return {
				...state,
				error: action.error,
				taskData: [...state.taskData, action.taskData],
				isLoading: action.isLoading,
			};
		}

		default:
			return state;
	}
}