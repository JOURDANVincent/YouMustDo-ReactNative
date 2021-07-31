import React, { useContext, } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// CONTEXT //
import { MainContext } from '../contexts/MainContext';


const HiddenItem = ( props ) => {

    const { data, rowMap } = props

    // recupère actions et states.. du context MainContext
    const context = useContext(MainContext);
    const { taskContext, useTaskSelector } = context
    const { getTask, setTaskStatus, setTask, delTask } = taskContext


    const closeItem = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        } else {
            console.log('doesn\'t exists...')
        }
    };
    
    const deleteItem = (rowMap, rowKey) => {
        console.log('This row delected', rowKey);
        closeItem(rowMap, rowKey);
    };


    return (

        <View style={[styles.rowBack, { backgroundColor: '#0000'}]}>

            <TouchableOpacity
                style={[styles.actionButton, styles.deleteBtn]}
                onPress={() => {
                    console.log('delete actual task..', data.item)
                    deleteItem(rowMap, data.index)
                    // delTask(data.item) // supression tâche en BDD //
                }}
            >   
                <Image
                    style={{ height: 20, width: 20, resizeMode: 'contain', opacity: 0.8 }}
                    source={require('../img/icon/trashLightGrey.png')}
                />
                <Text style={{ color: '#999', }}>supprimer</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.actionButton, styles.toggleBtn]}
                onPress={() => {
                    console.log('set actual task..', data.item)
                    closeItem(rowMap, data.index)
                    setTaskStatus(data.item)
                }}
            >   
                <View>
                    <Text style={{ color: '#fff', fontSize: 20}}>Statut</Text>
                    { data.item.status == 'close' ?
                        <Text style={{ color: '#0f0', }}>terminé</Text>
                    :
                        <Text style={{ color: '#FF7000', }}>en cours..</Text>
                    }
                </View>
                
            </TouchableOpacity>
        </View>

    )
}


const styles = StyleSheet.create({

    container: { 

    },

    rowBack: {
        zIndex: 2,
        alignItems: 'center',
        // backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        margin: 3,
    },

    actionButton: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        // width: 150,
    },

    deleteBtn: {
        backgroundColor: '#0002',
        left: 0,
        borderRadius: 5,
        borderColor: '#aaa',
        borderWidth: 1,
        width: 75,
    },

    toggleBtn: {
        backgroundColor: '#0002',
        right: 0,
        borderRadius: 5,
        borderColor: '#aaa',
        borderWidth: 1,
        width: 150,
    },

});


export default HiddenItem;
