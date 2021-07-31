import Realm from "realm";
import openRealm from '../database/OpenRealm'
import {ObjectId} from 'bson';


export function getTaskActions(app, dispatch) {
	return {
		
		addTask: async data => {

			const { name, type, status, date, hour=null } = data

			try {

				dispatch({type: 'ADD_TASk', isLoading: true});
				realm = await openRealm() // on récupère la base associé à l'utilisateur

				realm.write(() => {

					console.log('trying to add task in Task table..', data)
	
					realm.create("Task", {
		
						_id: ObjectId(),
						partitionKey: String(app.currentUser.id),
						name: name,
						type: type,
						status: 'open',
						register_date: '1234',
						date: Date(date),
						hour: Date(hour)
					});
				});

				const taskData = realm.objects('Task')
				console.log('taskData updated..', taskData)

				dispatch({type: 'ADD_TASK', taskData: taskData, isLoading: false });
				
			} catch (error) {
				
				console.log(
					"l\'ajout a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'ADD_TASK', error: error.message, isLoading: false });
			}
		},
		
		getTask: async ( filter ) => {

			try {

				dispatch({type: 'GET_TASk', isLoading: true});

				realm = await openRealm() // on récupère la base associé à l'utilisateur
				// const taskData = filter == 'open' ? realm.objects('Task').filtered("status= 'open'") : realm.objects('Task').filtered("status= 'close'")
				const taskData = realm.objects('Task')
				console.log('taskData in DB..', taskData)

				dispatch({type: 'GET_TASK', taskData: taskData, isLoading: false });

				return taskData
				
			} catch (error) {

				console.log(
					"la récupéretion a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'GET_TASK', error: error.message, isLoading: false });
			}
		},

		setTaskStatus: async data => {

			const { _id } = data

			try {

				dispatch({type: 'SET_TASK_STATUS', isLoading: true});

				realm = await openRealm() // on récupère la base associé à l'utilisateur
				let thisTask = realm.objectForPrimaryKey('Task', _id); // récupère la tâche sélectionnée avant modif
				let newStatus = thisTask.status == 'open' ? 'close' : 'open' // change le statut

				realm.write(() => {
					thisTask.status = newStatus;
				});

				const upTask = realm.objectForPrimaryKey('Task', _id); // check new status
				console.log('task status updated..', upTask)

				dispatch({type: 'SET_TASK_STATUS', taskData: upTask, isLoading: false });
				
			} catch (error) {

				console.log(
					"la mise à jour du status a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'SET_TASK_STATUS', error: error.message, isLoading: false });
			}
		},

		delTask: async data => {

			try {

				dispatch({type: 'DEL_TASK', isLoading: true});

				realm = await openRealm() // on récupère la base associé à l'utilisateur
				realm.write(() => {
					realm.delete(data)
				});

				dispatch({type: 'DEL_TASK', isLoading: false });
				
			} catch (error) {

				console.log(
					"la suppression a échouée avec l'erreur : ",
					error.code,
					error.message,
				);
				dispatch({type: 'DEL_TASK', error: error.message, isLoading: false });
			}
		},

		
	};
}
