import React, { useContext } from 'react';
import { StyleSheet, View, Image, Text, } from 'react-native';
import { TouchableOpacity} from 'react-native-gesture-handler'

import LinearGradient from 'react-native-linear-gradient';
import { LinearProgress } from 'react-native-elements';

// CONTEXT //
import { MainContext } from '../contexts/MainContext';


const MainHeader = ( props ) => {

    const { scene, navigation } = props

    const { route } = scene
    const { name } = route
    
    // console.log(scene)

    // recupère fonction signOut du context
    const context = useContext(MainContext);
    const { userContext, useUserSelector } = context
    const { signOut } = userContext

    // active linear waiting progress //
    const isLoading = useUserSelector((state) => { return state.isLoading; })


    return (
        
        name == 'AddTask' ?

            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 3}} colors={['#ec1c24', '#000',]} style={styles.container}>

                <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 5,}}>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} 
                        onPress={() => navigation.goBack()}
                    >
                        <Image
                            style={{ height: 20, width: 20, resizeMode: 'contain', paddingLeft: 50}}
                            source={require('../img/icon/arrowBackLightGrey.png')}
                        />
                    </TouchableOpacity>

                    <View style={{ flex: 4, }}>
                        <Text style={{ color: '#ddd', fontSize: 20, fontWeight: 'bold', paddingLeft: 0 }}>Nouvelle tâche</Text>
                    </View>

                    <TouchableOpacity
                        style={{ flex: 1, width: 70, justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => signOut()}
                    >
                        <Image
                            style={{ height: 30, width: 30, resizeMode: 'contain', opacity: 0.5,}}
                            source={require('../img/icon/exitBlack.png')}
                        />
                    </TouchableOpacity>
                </View>

                { isLoading ? <LinearProgress color="red" style={{ position: 'relative', bottom: 0}}/> : null }

            </LinearGradient>

        :

            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 3}} colors={['#ec1c24', '#000',]} style={styles.container}>

                <View style={{ width: '100%', flexDirection: 'row', position: 'absolute', bottom: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} >
                        <Image
                            style={{ height: 40, width: 40, resizeMode: 'contain', }}
                            source={require('../img/logo/youMustDoRed.png')}
                        />
                    </View>

                    <View style={{ flex: 4,  }}>
                        <Text style={{ color: '#ddd', fontSize: 20, fontWeight: 'bold',}}>you must do</Text>
                    </View>

                    <TouchableOpacity
                        style={{ flex: 1, width: 70, justifyContent: 'center', alignItems: 'center', }}
                        onPress={() => signOut()}
                    >
                        <Image
                            style={{ height: 30, width: 30, resizeMode: 'contain', opacity: 0.5,}}
                            source={require('../img/icon/exitBlack.png')}
                        />
                    </TouchableOpacity>
                </View>

                { isLoading ? <LinearProgress color="red" style={{ position: 'relative', bottom: 0}}/> : null }

            </LinearGradient>

    )
}


const styles = StyleSheet.create({

    container: { 
        position: 'absolute',
        top: 0,
        flex: 1,
        width: '100%',
        minHeight: 60,
        // paddingHorizontal: 50,
        paddingVertical: 10, 
        borderBottomLeftRadius: 20, 
        borderBottomRightRadius: 20,
        elevation: 5,
    },

});


export default MainHeader;
