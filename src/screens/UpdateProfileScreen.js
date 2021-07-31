import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';


const UpdateProfileScreen = ( props ) => {

    const { navigation } = props;

    const dispatch = useDispatch() // lien vers fonctions du reducer

    // constantes formulaire inscription //
        const [ firstname, setFirstname ] = useState('billy');
        const [ lastname, setLastname ] = useState('jim');
        const [ email, setEmail ] = useState('billy@jim.fr');
        const [ password, setPassword ] = useState('Deszjim80@');
        const [ confirm, setConfirm ] = useState('Deszjim80@');
        const [ isVisible, setIsVisible ] = useState(true);

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


    const register = () => { // contrôle des données avant enregistrement

        if(confirm != password){
            console.log('different')
            setError('different')
        }
        else if(error != null || email == null || password == null) { 
            console.log('main')
            setError('main')
        }
        else {
            let user = { firstname: firstname, lastname: lastname, email: email, password: password } // Création nouvel utilisateur
            console.log('user to register..', user)

            dispatch(registerDB(user)) // appel fonction addUser / userSlice
        }
    }


    return (

        <View style={styles.container}>

            {/* <View style={{ flex: 1, width: '100%', backgroundColor: 'green'}}>
                <Image
                    style={{ height: '100%', resizeMode: 'contain' }}
                    source={require('../../src/img/logo/youMustDoRed.png')}
                />
            </View> */}

            <ScrollView style={{ flex: 1}}>

                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingTop: 25, }}>

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
                                source={ isVisible ? require('../../src/img/icon/ceye.png') : require('../../src/img/icon/oeye.png')}
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
                                source={ isVisible ? require('../../src/img/icon/ceye.png') : require('../../src/img/icon/oeye.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'red', fontWeight: 'bold'}}>{ error == 'confirm' ? '* format inconnu' : error == 'different' ? '* mot de passe différents' : null }</Text>

                </View>

            </ScrollView>

            <TouchableOpacity
                style={{ width: '90%', backgroundColor: '#ec1c24', color: 'white', borderRadius: 10, paddingVertical: 10, marginVertical: 20, elevation: 5 }}
                onPress={() => register()}
            >
                <Text style={{ textAlign: 'center', color: 'white', fontSize: 20, }}>Inscription</Text>
            </TouchableOpacity>

        </View>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: '#2A0A50'
    },

    iBox: {
        height: 50,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'white', 
        borderBottomColor: '#888',
        borderBottomWidth: 1, 
        borderRadius: 10, 
        marginBottom: 5,
        // elevation: 3,
    },

    input: { 
        color: '#777', 
        fontSize: 16, 
        
        textAlign :'left',
        paddingLeft: 10
    },

    iTitle: { 
        width: '90%', 
        // textAlign :'left',
        color: '#333', 
        fontSize: 18, 
        fontWeight: 'bold',
        paddingLeft: 5,
        marginBottom: 5, 
    },

    
});


export default UpdateProfileScreen;