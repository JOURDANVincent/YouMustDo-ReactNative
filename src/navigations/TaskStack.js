import React, { useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// custom header and screens //
import MainHeader from '../components/MainHeader'
import TaskScreen from '../screens/TaskScreen'
import AddTaskScreen from '../screens/AddTaskScreen'
import ProfileScreen from '../screens/ProfileScreen'


const Stack = createStackNavigator();


const TaskStack = ( props ) => {

    const { userId } = props


    return (
        
        <Stack.Navigator
            initialRouteName='Task'
        >

            <Stack.Screen
                name="Task"
                options={{ 
                    title: 'Task',
                    header: (props) => <MainHeader {...props} userId={userId} />,
                }}
            >
                {props => <TaskScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="AddTask"
                options={{ 
                    title: 'AddTask',
                    header: (props) => <MainHeader {...props} userId={userId} />,
                }}
            >
                {props => <AddTaskScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Profile"
                options={{ 
                    title: 'Profile',
                    header: (props) => <MainHeader {...props} />,
                }}
            >
                {props => <ProfileScreen {...props} />}
            </Stack.Screen>

        </Stack.Navigator>

    );
};

export default TaskStack;
