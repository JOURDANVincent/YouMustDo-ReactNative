import 'react-native-gesture-handler';
import React, {useReducer, useMemo, useEffect, Component } from 'react';
import { StatusBar } from 'react-native'

// NATIVE NAVIGATION BAR //
import NavigationBar from 'react-native-navbar-color'


// REDUCERS //
import {userReducer} from './src/reducers/userReducer';
import {taskReducer} from './src/reducers/taskReducer'
import {getUserActions} from './src/actions/userActions';
import { getTaskActions } from './src/actions/taskActions';

// REALM //
import { getRealmApp } from './src/database/RealmApp';

// CONTEXT //
import { MainContext } from './src/contexts/MainContext';

//NAVIGATION //
import NavigationRoot from './src/navigations/RootNavigator'


export default function App() {

	const [userState, userDispatch] = useReducer(userReducer, {
		isLoading: false,
		error: null,
		userId: null,
		userData: []
	});

	const [taskState, taskDispatch] = useReducer(taskReducer, {
		isLoading: false,
		error: null,
		taskData: []
	});

	const useUserSelector = (callback) => {
		return callback(userState)
	};

	const userContext = useMemo(() => {
		const app = getRealmApp();
		return getUserActions(app, userDispatch);
	}, []);

	const useTaskSelector = (callback) => {
		return callback(taskState)
	};

	const taskContext = useMemo(() => {
		const app = getRealmApp();
		return getTaskActions(app, taskDispatch);
	}, []);

	const generateToken = (length) => {
		//edit the token allowed characters
		var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
		var b = [];  
		for (var i=0; i<length; i++) {
			var j = (Math.random() * (a.length-1)).toFixed(0);
			b[i] = a[j];
		}
		return b.join("");
	}

	const context = {userContext, useUserSelector, taskContext, useTaskSelector, generateToken}
	// console.log(context)

	useEffect(() => {
		NavigationBar.setColor('#861116')
		
	}, [])


	return (

		<MainContext.Provider value={context}>
			<StatusBar hidden={true} />
			<NavigationRoot userId={userState.userId} />
		</MainContext.Provider>
	);
}
