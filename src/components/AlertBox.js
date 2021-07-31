import React, { useState, useEffect, useContext, useCallback } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, } from 'react-native';

import { MainContext } from '../contexts/MainContext';


const AlertBox = ( props ) => {

    const { errorAlert } = props;

    const context = useContext(MainContext)
    const { userContext } = context
    const { ackErrorLog } = userContext

    const [modalVisible, setModalVisible] = useState(false);
    

    const hideModal = () => {
        setModalVisible(false)
    }

    useEffect(() => {
        errorAlert != null ? setModalVisible(true) : null
    }, [context])


    return (

        modalVisible ?
        
        <View style={styles.container}>

            <View style={{ minHeight: 150, width: '95%', backgroundColor: '#fffd', borderRadius: 20, overflow: 'hidden', elevation: 10 }}>
                <Text style={{ flex: 1.5, width: '100%', textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#ec1c24', color: 'white', fontSize: 30}}>U MUST DO - Alert</Text>
                <Text style={{ flex: 2, width: '100%', textAlign: 'center', textAlignVertical: 'center', color: '#333', fontSize: 18}}>{errorAlert}</Text>
                <TouchableOpacity
                    style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'flex-end', borderTopColor: '#2225', borderTopWidth: 1}}
                    onPress={ () => {
                        ackErrorLog()
                        hideModal()
                    }}
                >
                    <Text style={{ color: '#ec1c24', fontWeight: 'bold', paddingRight: 25}}>fermer</Text>
                </TouchableOpacity>
            </View>

        </View>

        : null

    )
}


const styles = StyleSheet.create({

    container: { 
        zIndex: 999,
        position: 'absolute',
        backgroundColor: '#000a',
        height: '100%',
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10
    },

});


export default AlertBox;
