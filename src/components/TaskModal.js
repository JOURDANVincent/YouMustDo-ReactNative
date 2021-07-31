import React, { useState, useEffect, useRef, useContext, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Modal, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TextInputMask from 'react-native-text-input-mask';
import moment from "moment";

import { MainContext } from '../contexts/MainContext';


const TaskModal = ( props ) => {

    const { isOpen, setIsOpen } = props

    // recupère fonction addTask... du context
    const context = useContext(MainContext);
    const { taskContext, useTaskSelector } = context
    const { addTask, setTask, delTask } = taskContext

    // input form //
        const [ name, setName ] = useState(null)
        const [ deadLine, setDeadLine ] = useState(null)
        const [ error, setError ] = useState(null)
        const [ type, setType ] = useState('tâche')

        const iName = useRef()
        const iDeadLine = useRef()
    // input form

    // GESTION TOGGLE BUTTON / BG //
    const toggleType = () => {
        type == 'tâche' ? setType('rendez-vous') : setType('tâche')
    }
    const isInactive = { backgroundColor: '#fff2', color: '#333', fontSize: 16, fontWeight: 'bold', borderRadius: 20, paddingHorizontal: 25, paddingVertical: 5, marginHorizontal: 15}
    const isActive = { backgroundColor: '#0002', color: '#fff', fontSize: 16, fontWeight: 'bold', borderRadius: 20, paddingHorizontal: 25, paddingVertical: 5, marginHorizontal: 15}

    // FORM INPUT //
    const checkName = (name) => {

        if(!(/^[a-zA-Z \sÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-]{2,20}$/).test(name)){
            setError('name');
        } else {
            setError(null);
        }
    }

    var currentDate = new Date()
    console.log(currentDate)
    currentDate = moment(currentDate).format('DD-MM-YYYY')
    console.log(currentDate)

    // FORM INPUT //
    const checkDeadLine = (name) => {

        if(!(/^[a-zA-Z \SÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ-]{2,20}$/).test(name)){
            setError('deadline');
        } else {
            setError(null);
        }
    }


    const submitTask = () => {

        const newTask = { name: name, type: type, status: 'open', deadLine: deadLine }
        console.log('new task to add..', newTask)

        if(name && type){
            setIsOpen(false)
            addTask(newTask)
            setName(null); setDeadLine(null)
        } else {
            Alert.alert('Champ requis', 'Veuillez remplir champ intitulé..')
        }
        
    }

    return (

        isOpen ?

        <View style={{ flex: 1, height: '100%', backgroundColor: '#0008', zIndex: 4, position: 'absolute', width: '100%', justifyContent: 'center', alignItems: 'center', }}>
            
            <TouchableOpacity
                style={{ position: 'absolute', top: 52, right: '10%'}}
                onPress={() => setIsOpen(false)}
            >
                <Text style={{ backgroundColor: '#fff2', color: '#ddd', fontSize: 16, padding: 10, paddingBottom: 15, borderRadius: 10}}>fermer X</Text>
            </TouchableOpacity>
            
            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 3}} colors={['#ec1c24', '#000',]} 
                 style={{ width: '95%', padding: 10, borderRadius: 10, overflow: 'hidden', elevation: 5}}>
                
                <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10, marginBottom: 20, borderRadius: 8}}>
                    <Text style={{ color: '#ccc', fontSize: 20, fontWeight: 'bold',}}>{type == 'tâche' ? 'Nouvelle tâche' : 'Nouveau rendez-vous'}</Text>
                </View>

                <Text style={styles.iTitle}>Intitulé</Text>
                <View style={styles.iBox}>
                    <TextInput
                        ref={iName}
                        style={[styles.input, { width: '100%'}]}
                        autoCapitalize='none'
                        onChangeText={(text) => setName(text)}
                        value={name}
                        returnKeyType="next" // bouton suivant
                        onBlur={() => checkName(name)}
                        onSubmitEditing={() => {
                            iDeadLine.current.focus();
                        }}
                        placeholderTextColor="#aaa"
                        placeholder={`intitulé ${type}..`}
                    />
                </View>
                { error == 'name' ? <Text style={{ color: 'black', fontWeight: 'bold', marginBottom: 20}}>* format non reconnu</Text> : null }

                <Text style={styles.iTitle}>Échéance</Text>
                <View style={styles.iBox}>
                    <TextInputMask
                        ref={iDeadLine}
                        style={[styles.input, { width: '100%'}]}
                        onChangeText={(formatted, extracted) => {
                            console.log(formatted) // +1 (123) 456-78-90
                            setDeadLine(formatted) // 1234567890
                        }}
                        mask={"[00] - [00] - 20[00]"}
                        value={deadLine}
                        onBlur={() => checkDeadLine(deadLine)}
                        blurOnSubmit={true}
                        placeholderTextColor="#aaa"
                        placeholder={`échéance ${type}..`}
                        keyboardType='decimal-pad'
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10}}>
                    <TouchableOpacity
                        onPress={() => toggleType()}
                    >
                        <Text style={type == 'tâche' ? isActive : isInactive }>tâche</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => toggleType()}
                    >
                        <Text style={type == 'rendez-vous' ? isActive : isInactive}>rendez-vous</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 5}}
                    onPress={() => submitTask()}
                >   
                    <View
                        style={{ width: '100%', height: 40, paddingVertical: 5, marginTop: 10, borderRadius: 10, 
                            elevation: 1, justifyContent: 'center', alignItems: 'center',
                            borderColor: '#777', borderWidth: 1 }}
                    >
                        <Text style={{ color: '#aaa', fontSize: 22, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'}}>valider</Text>
                    </View>
                </TouchableOpacity>

            </LinearGradient>

            {/* <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center', width: '85%',}}
                onPress={() => submitTask()}
            >   
                <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 2}} colors={['#ec1c24', '#000',]} 
                    style={{ width: '100%', height: 40, paddingVertical: 5, marginTop: 10, borderRadius: 10, elevation: 5, justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center', textAlignVertical: 'center'}}>ajouter</Text>
                </LinearGradient>
            </TouchableOpacity> */}

        </View>

        : null 

    )
}


const styles = StyleSheet.create({
    
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },

    iBox: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: 'white', 
        borderBottomColor: '#8889',
        borderBottomWidth: 1, 
        borderRadius: 10, 
        marginBottom: 15,
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
        marginBottom: 0, 
    },
});


export default TaskModal;
