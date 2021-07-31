import React, { useState, useEffect, useRef, useContext } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity, Switch } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// SCROLL INTO VIEW //
// import { wrapScrollView, useScrollIntoView, } from 'react-native-scroll-into-view';
// const CustomScrollView = wrapScrollView(ScrollView);

// COMPONENTS //
import AlertBox from '../components/AlertBox';
// CONTEXT //
import { MainContext } from '../contexts/MainContext';



const RegisterScreen = ( props ) => {

    const { navigation } = props;

    // récupère fonction signUp de Maincontext
    const context = useContext(MainContext)
    const { userContext, useUserSelector } = context
    const { signUp } = userContext

    // const errorAlert = useUserSelector((userState) => { return userState.error; })erreur d'inscription //
    const errorAlert = useUserSelector((userState) => { return userState.error; })

    //
    // const scrollIntoView = useScrollIntoView();
    

    // constantes formulaire inscription //
        const [ firstname, setFirstname ] = useState('billy');
        const [ lastname, setLastname ] = useState('jim');
        const [ email, setEmail ] = useState('billy@jim.fr');
        const [ password, setPassword ] = useState('Deszjim80@');
        const [ confirm, setConfirm ] = useState('Deszjim80@');
        const [ isVisible, setIsVisible ] = useState(true);
        const [ touchId, setTouchId ] = useState(false);

        const [ error, setError ] = useState(null); // check error
    
        const changeVisibility = () => { // hide / show pwd
            setIsVisible(!isVisible);
        }

        // ref pour next focus
        const iLastname = useRef(); 
        const iFirstname = useRef();
        const iEmail = useRef();
        const iPassword = useRef();
        const iConfirm = useRef();
        const iTouchId = useRef();
        const iSubmit = useRef();
    // constantes formulaire inscription //


    const checkLastname = (lastname) => {

        if(!(/^[a-zA-Z \sÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-]{2,20}$/).test(lastname)){
            setError('lastname');
        } else {
            setError(null);
        }
    }

    const checkFirstname = (firstname) => {

        if(!(/^[a-zA-Z \sÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-]{2,20}$/).test(firstname)){
            setError('firstname');
        } else {
            setError(null);
        }
    }

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

    const checkConfirm = (confirm) => {

        if(!(/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/).test(confirm)){
            setError('confirm')
        } else {
            setError(null)
        }
    }

    const checkTouchId = (isEnabled) => { // contrôle activation connexion par empreinte
        setTouchId(isEnabled)
    }


    const register = async () => { // contrôle des données avant enregistrement

        if(confirm != password){
            console.log('different')
            setError('different')
        }
        else if(error != null || email == null || password == null) { 
            console.log('main')
            setError('main')
        }
        else {

            let user = { firstname: firstname, lastname: lastname, email: email, password: password, touchId: touchId } // Création nouvel utilisateur
            console.log('user to register..', user)

            signUp(user) // appel fonction userActions
        }
    }


    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 2}} colors={['#ec1c24', '#000',]} style={styles.container}>

            {/* <View style={{ flex: 1, width: '100%', backgroundColor: 'green'}}>
                <Image
                    style={{ height: '100%', resizeMode: 'contain' }}
                    source={require('../../src/img/logo/youMustDoRed.png')}
                />
            </View> */}

            <AlertBox errorAlert={errorAlert} />

            <ScrollView style={{ flex: 1}}>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 30, }}>

                    <Text style={styles.iTitle}>Nom</Text>
                    <View style={styles.iBox}>
                        <TextInput
                            ref={iLastname}
                            style={[styles.input, { width: '100%'}]}
                            onChangeText={(text) => setLastname(text)}
                            value={lastname}
                            onBlur={() => checkLastname(lastname)}
                            returnKeyType="next" // bouton suivant
                            onSubmitEditing={() => {
                                iFirstname.current.focus();
                            }}
                            placeholderTextColor="#999"
                            placeholder="Entrez votre nom.."
                        />
                    </View>
                    <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'lastname' ? '* format non reconnu' : '' }</Text>

                    <Text style={styles.iTitle}>Prénom</Text>
                    <View style={styles.iBox}>
                        <TextInput
                            ref={iFirstname}
                            style={[styles.input, { width: '100%'}]}
                            onChangeText={(text) => setFirstname(text)}
                            value={firstname}
                            onBlur={() => checkFirstname(firstname)}
                            returnKeyType="next" // bouton suivant
                            onSubmitEditing={() => {
                                iEmail.current.focus();
                            }}
                            placeholderTextColor="#999"
                            placeholder="Entrez votre prénom.."
                        />
                    </View>
                    <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'firstname' ? '* format non reconnu' : '' }</Text>

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
                            placeholder="Entrez votre email.."
                        />
                    </View>
                    <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'email' ? '* format inconnu' : null }</Text>
                    
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
                            returnKeyType="next" // bouton suivant
                            onSubmitEditing={() => {
                                iConfirm.current.focus();
                            }}
                            placeholderTextColor="#999"
                            placeholder="Entrez votre mot de passe.."
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
                    <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'password' ? '* format inconnu' : error == 'different' ? '* mot de passe différents' : null }</Text>
                    
                    <Text style={styles.iTitle}>Confirmation mot de passe</Text>
                    <View style={styles.iBox}>
                        <TextInput
                            ref={iConfirm}
                            style={[styles.input, { width: '85%'}]}
                            autoCapitalize='none'
                            secureTextEntry={isVisible}
                            onChangeText={(text) => setConfirm(text)}
                            value={confirm}
                            onBlur={() => checkConfirm(confirm)}
                            returnKeyType="next" // bouton suivant
                            // onSubmitEditing={() => scrollIntoView(iTouchId.current)} 
                            blurOnSubmit={true}
                            placeholderTextColor="#999"
                            placeholder="Confirmez votre mot de passe.."
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
                    <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'confirm' ? '* format inconnu' : error == 'different' ? '* mot de passe différents' : null }</Text>

                </View>

                <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginBottom: 10 }}>
                    <Text style={{ width: '80%', color: '#333', fontSize: 18, fontWeight: 'bold', paddingLeft: 15 }}>Connexion par empreinte</Text>
                    <View style={{ width: '20%', alignItems: 'center'}}>
                        <Switch
                            ref={iTouchId}
                            trackColor={{ false: "#bbbb", true: "#888" }}
                            thumbColor={touchId ? "#f4f3f4" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={checkTouchId}
                            value={touchId}
                        />
                    </View>
                </View>

                <TouchableOpacity
                    
                    style={{ width: '90%', backgroundColor: '#ec1c24', color: 'white', borderRadius: 10, paddingVertical: 10, marginVertical: 20, marginLeft: '5%', elevation: 5 }}
                    onPress={() => register()}
                >
                    <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, }}>Inscription</Text>
                </TouchableOpacity>

            </ScrollView>

            

        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        paddingTop: 130,
        // justifyContent: 'center',
        // backgroundColor: '#2A0A50'
    },

    iBox: {
        height: 40,
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'white', 
        borderBottomColor: '#8889',
        borderBottomWidth: 1, 
        borderRadius: 10, 
        marginBottom: 5,
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
        paddingLeft: 0,
        marginBottom: 5, 
    },

    
});


export default RegisterScreen;