import React, { useEffect, useState, useContext, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Picker} from '@react-native-picker/picker';
import moment from "moment";

// CONTEXT //
import { MainContext } from '../contexts/MainContext';


const AddTaskScreen = ( props ) => {

    const { navigation } = props;

    // recupère fonction addTask... du context
    const context = useContext(MainContext);
    const { taskContext, useTaskSelector, generateToken } = context
    const { getTask, addTask, setTaskStatus, setTask, delTask } = taskContext

    // récupère date actuelle
    let currentDate = moment(new Date()).format('DD MMMM YYYY')
    let currentHour = moment(new Date()).add(0, 'hours').format('HH:mm')

    // input form //
        const [ name, setName ] = useState(null)
        const [ date, setDate ] = useState(null)
        const [ hour, setHour ] = useState(null)
        const [ error, setError ] = useState(null)
        const [ type, setType ] = useState('task')

        const iName = useRef()
        const iHour = useRef()
        const iDate = useRef()
        const iType = useRef()
    // input form


    // FORM INPUT NAME //
    const checkName = (name) => {

        if(!(/^[a-zA-Z \sÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-]{2,20}$/).test(name)){
            setError('name');
        } else {
            setError(null);
        }
    }

    const checkDate = date => {
        date ? console.log('date', date) : setError('date')
    }

    const checkHour = hour => {
        hour ? console.log('hour', hour) : setError('hour')
    }

    const checkType = (type) => {
        setType(type)
        iType.current.blur()
    }


    const submitTask = () => {

        if(name && type && date){

            const newTask = { name: name, type: type, status: 'open', date: date, hour: hour }
            console.log('new task to add..', newTask)
            addTask(newTask)
            setName(null); setDate(null); setHour(null)
            navigation.navigate('Task')

        } else {
            Alert.alert('Champ requis', 'Veuillez remplir champ intitulé..')
        }
        
    }

    useEffect(() => {
        setDate(currentDate)
        setHour(currentHour)
    }, [])
    

    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 2}} colors={['#ec1c24', '#000',]} style={styles.container}>
                
            <Text style={styles.iTitle}>Quelle tâche à ajouter</Text>
            <View style={[styles.iBox, { height: 40, marginBottom: 30,}]}>
                <TextInput
                    ref={iName}
                    style={[styles.input, { width: '80%'}]}
                    autoCapitalize='none'
                    onChangeText={(text) => setName(text)}
                    value={name}
                    returnKeyType="next" // bouton suivant
                    onBlur={() => checkName(name)}
                    onSubmitEditing={() => {
                        iDate.current.focus();
                    }}
                    placeholderTextColor="#999"
                    placeholder={`nom de la ${type}..`}
                />
                <Image
                    style={{ height: 25, width: '10%', resizeMode: 'contain'}}
                    source={require('../img/icon/micLightGrey.png')}
                />
                <TouchableOpacity style={{ width: '10%', alignItems: 'center', paddingTop: 6 }}
                    onPress={() => setName(null)}
                >
                    <Image
                        style={{ height: 15, width: 15, resizeMode: 'contain'}}
                        source={require('../img/icon/cancelLightGrey.png')}
                    />
                </TouchableOpacity>
            </View>
            { error == 'name' ? <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 20}}>* format non reconnu</Text> : null }

            <Text style={styles.iTitle}>A terminer pour</Text>
            <View style={[styles.iBox, { height: 40, marginBottom: 20,}]}>
                <TextInput
                    ref={iDate}
                    style={[styles.input, { width: '80%'}]}
                    onChangeText={(date) => {
                        setDate(date) 
                    }}
                    value={date}
                    onBlur={() => checkDate(date)}
                    returnKeyType="next" // bouton suivant
                    onSubmitEditing={() => {
                        iHour.current.focus();
                    }}
                    placeholderTextColor="#999"
                    placeholder={`date de fin..`}
                    keyboardType='decimal-pad'
                />
                <Image
                    style={{ height: 25, width: '10%', resizeMode: 'contain'}}
                    source={require('../img/icon/agendaFreeLightGrey.png')}
                />
                <TouchableOpacity style={{ width: '10%', alignItems: 'center', paddingTop: 6 }}
                    onPress={() => setDate(null)}
                >
                    <Image
                        style={{ height: 15, width: 15, resizeMode: 'contain'}}
                        source={require('../img/icon/cancelLightGrey.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={[styles.iBox, { height: 40, marginBottom: 40,}]}>
                <TextInput
                    ref={iHour}
                    style={[styles.input, { width: '80%'}]}
                    onChangeText={(hour) => {
                        setHour(hour) 
                    }}
                    value={hour}
                    onBlur={() => checkHour(hour)}
                    returnKeyType="next" // bouton suivant
                    onSubmitEditing={() => {
                        iType.current.focus();
                    }}
                    // blurOnSubmit={true}
                    placeholderTextColor="#999"
                    placeholder={`heure de fin..`}
                    keyboardType='decimal-pad'
                />
                <Image
                    style={{ height: 25, width: '10%', resizeMode: 'contain'}}
                    source={require('../img/icon/clockLightGrey.png')}
                />
                <TouchableOpacity style={{ width: '10%', alignItems: 'center', paddingTop: 6 }}
                    onPress={() => setHour(null)}
                >
                    <Image
                        style={{ height: 15, width: 15, resizeMode: 'contain'}}
                        source={require('../img/icon/cancelLightGrey.png')}
                    />
                </TouchableOpacity>
            </View>

            <Text style={styles.iTitle}>Quelle type ?</Text>
            <View style={[styles.iBox, { height: 45, marginBottom: 30, }]}>
                <Picker
                    ref={iType}
                    style={{ width: '100%', color: '#bbb', fontSize: 15 }}
                    selectedValue={type}
                    returnKeyType="submit" // bouton suivant
                    onValueChange={
                        (itemValue, itemIndex) => checkType(itemValue) 
                    }
                >
                    <Picker.Item label="Tâche" value="task" />
                    <Picker.Item label="Rendez-vous" value="rdv" />
                    <Picker.Item label="Événement" value="event" />
                    <Picker.Item label="Travail" value="work" />
                    <Picker.Item label="Autre.." value="other" />
                </Picker>
            </View>

            <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 5}}
                onPress={() => submitTask()}
            >   
                <View
                    style={{ 
                        width: '95%', height: 40, paddingVertical: 5, marginTop: 20, borderRadius: 10, 
                        elevation: 5, justifyContent: 'center', alignItems: 'center',
                        backgroundColor: '#ec1c24'}}
                >
                    <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'}}>ajouter</Text>
                </View>
            </TouchableOpacity>

        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingTop: 80,
    },

    iBox: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: '#8889',
        borderBottomWidth: 1, 
        borderRadius: 10, 
    },

    input: { 
        color: '#bbb', 
        fontSize: 16, 
        
        textAlign :'left',
        paddingLeft: 20
    },

    iTitle: { 
        width: '95%', 
        color: '#333', 
        fontSize: 18, 
        fontWeight: 'bold',
        paddingLeft: 10,
        marginBottom: 10
    },
    
});


export default AddTaskScreen;