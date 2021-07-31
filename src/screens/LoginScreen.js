import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, Modal, Alert, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TouchID from 'react-native-touch-id'


// KEY CHAIN //
import * as Keychain from 'react-native-keychain';

// CONTEXT //
import {MainContext} from '../contexts/MainContext';

// COMPONENTS //
import AlertBox from '../components/AlertBox';


const LoginScreen = ( props ) => {

    const { navigation } = props;

    // recupère fonction signIn... du context
    const context = useContext(MainContext);
    const { userContext, useUserSelector } = context
    const { signIn } = userContext

    // erreru de connexion //
    const errorAlert = useUserSelector((userState) => { return userState.error; })

    // input formulaire connexion
        const [ email, setEmail ] = useState('billy@jim.fr');
        const [ password, setPassword ] = useState('Deszjim80@');
        const [ isVisible, setIsVisible ] = useState(true);
        const [ touchId, setTouchId ] = useState(false);

        const [ error, setError ] = useState(null);
    
        const changeVisibility = () => {
            setIsVisible(!isVisible);
        }

        const iEmail = useRef(); 
        const iPassword = useRef();
    // input formulaire connexion


    const checkEmail = (email) => {

        if(!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/).test(email)){
            setError('email');
        } else {
            setError(null);
        }
    }

    const checkPassword = (password) => {

        if(!(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/).test(password)){
            setError('password')
        } else {
            setError(null)
        }
    }

    const checkTouchId = (isEnabled) => { // contrôle activation connexion par empreinte
        setError(null)
        setTouchId(isEnabled)
    }


    const connection = () => {

        if(error === null && email != null && password != null){

            let user = { email: email, password: password } // Création nouvel utilisateur
            console.log('user to connect..', user)

            signIn(user) // try login mongo db

        } else {
            console.log('oups..erreur formulaire')
            setError('unknown')
        } 
        
    }

    const addTouchId = async () => {

        console.log('trying to add touchId..')
        let newKey = touchId ? await Keychain.setGenericPassword(email, password) : null
		console.log('newKey', newKey)
    }


    const touchConnection = async () => {

		const optionalConfigObject = {
			title: 'Connexion par empreinte', // Android
			imageColor: '#e00606', // Android
			imageErrorColor: '#ff0000', // Android
			sensorDescription: 'Capteur d\'empreinte', // Android
			sensorErrorDescription: 'Failed', // Android
			cancelText: 'Annuler', // Android
			fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
			unifiedErrors: true, // use unified error messages (default false)
			passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
		};

        const credentials = await Keychain.getGenericPassword()
        console.log('credentials', credentials) 

		if(credentials){ // demande empreinte utilisateur //

            TouchID.authenticate('Poser votre doigt sur le capteur d\'empreinte pour vous connecter..', optionalConfigObject)
                .then(success => {
                    // Alert.alert('Empreinte reconnue');
                    console.log('user to connect..', credentials.username, credentials.password)
                    let user = { email: credentials.username, password: credentials.password}
                    signIn(user) // try login mongo db
                })
                .catch(error => {
                    Alert.alert('Empreinte inconnue..', error.name, error.message);
                });
        } 

        else { // ouvre alert //

            Alert.alert(
                'Aucune empreinte associée au compte..', 
                'Voulez vous associé votre empreinte et vous connecter?',
                // 'La connexion par empreinte ne sera disponnible qu\à votre prochaine connexion ?', 
            [
                {
                    text: 'Oui',
                    onPress: () => {
                        if(!email || !password){
                            Alert.alert(
                                'Données manquantes..', 
                                'Renseignez d\'abord email et mot de passe pour pouvoir associer votre compte..' + "\n\n" +  'Ensuite vous pourrez réessayer'
                            );
                        } else {
                            addTouchId();
                        }
                    },
                },
                {
                  text: 'Non'
                },
            ]);
        }
	}



    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 2}} colors={['#ec1c24', '#000',]} style={styles.container}>

            <AlertBox errorAlert={errorAlert} /> 

            <View style={{ flex: 20, width: '100%', justifyContent: 'center', alignItems: 'center', }}>

                <Text style={styles.iTitle}>Email</Text>
                <View style={styles.iBox}>
                    <TextInput
                        ref={iEmail}
                        style={[styles.input, { width: '100%'}]}
                        keyboardType='email-address'
                        autoCapitalize='none'
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                        returnKeyType="next" // bouton suivant
                        onBlur={() => checkEmail(email)}
                        onSubmitEditing={() => {
                            iPassword.current.focus();
                        }}
                        blurOnSubmit={false}
                        placeholderTextColor="#999"
                        placeholder="entrez votre email.."
                    />
                </View>
                <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'email' ? '* format inconnu' : (error == 'unknown' ? '* email / mot de passe inconnu' : '' ) }</Text>
                
                <Text style={styles.iTitle}>Mot de passe</Text>
                <View style={styles.iBox}>
                    <TextInput
                        ref={iPassword} 
                        style={[styles.input, { width: '85%'}]}
                        autoCapitalize='none'
                        secureTextEntry={isVisible}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        onBlur={() => checkPassword(password)}
                        blurOnSubmit={true}
                        placeholderTextColor="#999"
                        placeholder="entrez votre mot de passe.."
                    />
                    <TouchableOpacity
                        style={{ width: '15%', justifyContent: 'center', }}
                        onPress={ () => { changeVisibility()} }
                    >
                        <Image
                            style={{ height: 25, width: 25, resizeMode: 'contain' }}
                            source={ isVisible ? require('../../src/img/icon/ceyeGrey.png') : require('../../src/img/icon/oeyeGrey.png')}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'password' ? '* format inconnu' : (error == 'unknown' ? '* email / mot de passe inconnu' : '') }</Text>
                
                <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 20 }}>
                    <Text style={{ width: '80%', color: '#333', fontSize: 18, fontWeight: 'bold', paddingLeft: 15 }}>Connexion par empreinte</Text>
                    <View style={{ width: '20%', alignItems: 'center', paddingRight: 20}}>
                        <Switch
                            trackColor={{ false: "#bbbb", true: "#888" }}
                            thumbColor={touchId ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={checkTouchId}
                            value={touchId}
                        />
                    </View>
                </View>

                { touchId ?
                    <TouchableOpacity
                        style={{ width: '90%', justifyContent: 'center', alignItems: 'center', paddingVertical: 25 }}
                        onPress={() => touchConnection()}
                    >
                        <Image
                            style={{ height: 100, width: 100, resizeMode: 'contain', opacity: 0.6 }}
                            source={ require('../../src/img/icon/touchLightGrey.png') }
                        />
                    </TouchableOpacity>
                : 
                    <TouchableOpacity
                        style={{ width: '90%', backgroundColor: '#ec1c24', color: 'white', borderRadius: 10, paddingVertical: 10, marginTop: 50, marginBottom: 10, elevation: 5 }}
                        onPress={() => connection()}
                    >
                        <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, }}>Connexion</Text>
                    </TouchableOpacity>
                }

            </View>

            <TouchableOpacity
                style={{ flex: 1, width: '100%', flexDirection: 'row', marginBottom: 10, justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 10 }}
                onPress={() => navigation.navigate('Register')}
            >
                <Text style={{ color: '#bbb', fontSize: 16, }}>Pas encore inscrit ?</Text>
                <Text style={{ color: '#ec1c24', fontSize: 16, fontWeight: 'bold', marginLeft: 5 }}>Créer un compte</Text>
            </TouchableOpacity>

        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 150,
        // backgroundColor: '#2A0A50'
    },

    iBox: {
        height: 40,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'white', 
        borderBottomColor: '#8889',
        borderBottomWidth: 1, 
        borderRadius: 10, 
        marginBottom: 0,
        // elevation: 3,
    },

    input: { 
        color: '#bbb', 
        fontSize: 16, 
        
        textAlign :'left',
        paddingLeft: 20
    },
    // input focus: {
    //     borderBottomColor: 'red',
    // },

    iTitle: { 
        width: '90%', 
        // textAlign :'left',
        color: '#333', 
        fontSize: 18, 
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: 5, 
    },

    
});


export default LoginScreen;