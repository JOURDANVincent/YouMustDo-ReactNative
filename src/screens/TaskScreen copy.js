import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// CONTEXT //
import { MainContext } from '../contexts/MainContext';

// COMPONENTS //
import TaskModal from '../components/TaskModal';


const TaskScreen = ( props ) => {

    const { navigation, userId } = props;

    const [ isOpen, setIsOpen ] = useState(false)

    // recupère fonction addTask... du context
    const context = useContext(MainContext);
    const { taskContext, useTaskSelector } = context
    const { getTask } = taskContext

    const taskList = useTaskSelector((state) => { return state.taskData; })

    useEffect(() => {
        // console.log('loading all tasks..')
        getTask()
    }, [taskContext])


    const renderItem = ({ item }) => {

        return (

            <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 5}} colors={['#ec1c2450', '#000',]} 
                style={{ 
                    flexDirection: 'row', height: 70, backgroundColor: '#0002', borderRadius: 3, 
                    elevation: 1, paddingVertical: 8, alignItems: 'center', paddingHorizontal: 15,
                    marginVertical: 3, 
                }}>
                <View style={{}}>
                    <Image style={{ height: 20 , width: 20, opacity: 0.4 }} source={item.status == 'open' ? require('../img/icon/checkBoxLightGrey.png') : require('../img/icon/checkBoxLightGreyChecked.png')} />
                </View>
                <View style={{ paddingHorizontal: 15}}>
                    <Text numberOfLines={1} style={{ color: '#fff', fontSize: 16, fontWeight: 'bold',}}>{item.name}</Text>
                    <Text style={{ color: '#ccc'}}>{item.dead_line}</Text>
                </View>
            </LinearGradient>
        )
    }

    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 2}} colors={['#ec1c24', '#000',]} style={styles.container}>

            <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} />

            { taskList ? 
                <FlatList
                    // style={{ paddingHorizontal: 8, marginTop: 8}}
                    contentContainerStyle={{ paddingTop: 70, paddingBottom: 80, paddingHorizontal: 5, }}
                    data={taskList[0]}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index}
                />

            : !isOpen ?
                <View style={{ backgroundColor: '#0002', padding: 30, borderRadius: 5, elevation: 1}}>
                    <Text style={{ marginBottom: 20, fontWeight: 'bold', color: '#ddd'}}>Aucune tâche d'enregistrée pour le moment</Text>
                    <TouchableOpacity
                        onPress={() => setIsOpen(true)}
                    >
                        <Text style={{ color: '#ec1c24', fontWeight: 'bold',}}>+ ajouter une tâche..</Text>
                    </TouchableOpacity>
                </View>
            : null }

            { !isOpen ? 
                <TouchableOpacity
                    style={{zIndex: 5, position: 'absolute', width: '100%', bottom: 20, justifyContent: 'center', alignItems: 'center',}}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text style={{ 
                        width: '50%', height: 40, paddingVertical: 5, color: '#fff', fontSize: 16, 
                        fontWeight: 'bold', backgroundColor: '#ec1c24', borderRadius: 12, 
                        textAlign: 'center', textAlignVertical: 'center', elevation: 5,}}>{isOpen ? 'annuler' : 'nouvelle tâche/rdv'}</Text>
                </TouchableOpacity>
            : null }

            {/* <View style={{ height: 80, }} /> */}
        
        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        // paddingHorizontal: 5
        zIndex: 0,
    },

    
    
});


export default TaskScreen;