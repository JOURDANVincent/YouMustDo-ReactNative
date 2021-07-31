import React, { useState} from 'react'
import { createStackNavigator } from '@react-navigation/stack'

// custom header and screens //
import ConnectionHeader from '../components/ConnectionHeader'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'


const Stack = createStackNavigator();


const ConnectionStack = ( props ) => {


    return (
        
        <Stack.Navigator
            initialRouteName='Login'
        >

            <Stack.Screen
                name="Login"
                options={{ 
                    title: 'Login',
                    header: (props) => <ConnectionHeader {...props} />,
                }}
            >
                {props => <LoginScreen {...props} />}
            </Stack.Screen>

            <Stack.Screen
                name="Register"
                options={{ 
                    title: 'Register',
                    header: (props) => <ConnectionHeader {...props} />,
                }}
            >
                {props => <RegisterScreen {...props} />}
            </Stack.Screen>

        </Stack.Navigator>

    );
};

export default ConnectionStack;
