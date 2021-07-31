import React, { useContext } from 'react';
import { StyleSheet, Text, Image, } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { LinearProgress } from 'react-native-elements';

// CONTEXT //
import { MainContext} from '../contexts/MainContext';


const ConnectionHeader = ( props ) => {

    const { scene, navigation } = props

    const { route } = scene
    const { name } = route

    const context = useContext(MainContext)
    const { useUserSelector } = context

    const isLoading = useUserSelector((userState) => { return userState.isLoading; })

    return (
        
        <LinearGradient start={{x: 0, y: -2}} end={{x: 0, y: 1}} colors={['#000', '#ec1c24',]} style={[styles.container, { height: 125, }]}>

            <Image
                style={{ position: 'absolute', top: 10, height: 85, width: 100, resizeMode: 'contain', opacity: 1 }}
                source={require('../img/logo/youMustDoRed.png')}
            />
            <Text style={{position: 'absolute', bottom: 5, color: '#ddd', fontSize: 22, fontWeight: 'bold', marginBottom: 5}}>you must do</Text>

            { isLoading ? <LinearProgress color="#7777" style={{ position: 'absolute', bottom: 0}}/> : null }

        </LinearGradient>

    )
}


const styles = StyleSheet.create({

    container: { 
        position: 'absolute',
        top: 0,
        width: '100%',
        overflow: 'hidden',
        alignItems: 'center',
        borderBottomLeftRadius: 25, 
        borderBottomRightRadius: 25,
        elevation: 5,
    },

});


export default ConnectionHeader;
