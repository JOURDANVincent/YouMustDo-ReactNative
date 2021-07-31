import React from 'react';

// navigation //
import { NavigationContainer } from '@react-navigation/native';
import ConnectionStack from './ConnectionStack'
import TaskStack from './TaskStack';


const RootNavigator = ({userId} ) => {

    return (
        
        <NavigationContainer>
            { userId ? <TaskStack /> : <ConnectionStack /> }
        </NavigationContainer>
    )
}

export default RootNavigator;
