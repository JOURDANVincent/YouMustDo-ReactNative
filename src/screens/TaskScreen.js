import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

// SWIPE LIST //
import { SwipeListView } from 'react-native-swipe-list-view';

// CONTEXT //
import { MainContext } from '../contexts/MainContext';

// COMPONENTS //
import ItemList from '../components/ItemList';
import HiddenItem from '../components/HiddenItem';


const TaskScreen = ( props ) => {

    const { navigation, userId } = props;

    // recupère actions et states.. du context MainContext
    const context = useContext(MainContext);
    const { taskContext, useTaskSelector } = context
    const { getTask, setTaskStatus, setTask, delTask } = taskContext

    const isLoading = useTaskSelector((taskState) => { return taskState.isLoading; }) 
    // const DBtaskList = useTaskSelector((taskState) => { return taskState.taskData; }) 

    const [ allTask, setAllTask ] = useState([])
    const [ progressTask, setProgressTask ] = useState([])
    const [ overTask, setOverTask ] = useState([])


    useEffect(() => {

        async function loadingTaskInDB() {

            console.log('loading/reloading all tasks..')
            tasks = await getTask()
            setAllTask(tasks)

            // let progress = await getTask('open')
            // setProgressTask(progress)

            // let over = await getTask('close')
            // setOverTask(over)
            
        }
        loadingTaskInDB();

    }, [isLoading])


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

    const onItemOpen = rowKey => console.log('This row opened', rowKey)


    const renderItem = ({item}) => <ItemList item={item} /> 

    const renderHiddenItem = (data, rowMap) => {

        return(

            <View style={[styles.rowBack, { backgroundColor: '#0000'}]}>

                <TouchableOpacity
                    style={[styles.actionButton, styles.deleteBtn]}
                    onPress={() => {
                        console.log('delete actual task..', data.item)
                        // deleteItem(rowMap, data.index)
                        delTask(data.item) // supression tâche en BDD //
                    }}
                >   
                    <Image
                        style={{ height: 30, width: 30, resizeMode: 'contain', opacity: 0.8 }}
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
                    <View style={{ alignItems: 'center', }}>
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


    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 2}} colors={['#ec1c24', '#000',]} style={styles.container}>

            <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop: 80}}>Tâches en cours..</Text>

            { allTask.length != 0 ? // si données à afficher

                <SwipeListView
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 185, paddingHorizontal: 5 }}
                    data={allTask}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    keyExtractor={(item, index) => index}
                    leftOpenValue={80}
                    rightOpenValue={-100}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onItemOpen}
                />

            :  // si la modal ajout tâche fermée..

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 80}}>
                    <Image
                        style={{ height: '50%', width: '50%', resizeMode: 'contain', }}
                        source={require('../img/icon/relaxLightGrey.png')}
                    />
                    <Text style={{ color :'#ccc', fontSize: 20, }}>Cool aujourd'hui..</Text>
                </View>

            }

            {/* <Text style={{ color: '#333', fontSize: 18, fontWeight: 'bold', paddingLeft: 15, paddingTop: 80}}>Tâches terminées..</Text>

            { overTask.length != 0 ? // si données à afficher

                <SwipeListView
                    contentContainerStyle={{ flex: 1, paddingTop: 10, paddingBottom: 185, paddingHorizontal: 5 }}
                    data={overTask}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    keyExtractor={(item, index) => index}
                    leftOpenValue={80}
                    rightOpenValue={-100}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onItemOpen}
                />

            :  // si la modal ajout tâche fermée..

                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 80}}>
                    <Image
                        style={{ height: 150, width: 150, resizeMode: 'contain', }}
                        source={require('../img/icon/relaxLightGrey.png')}
                    />
                    <Text style={{ color :'#ccc', fontSize: 20, }}>Cool aujourd'hui..</Text>
                </View>

            } */}

            <TouchableOpacity
                style={{zIndex: 5, position: 'absolute', width: '100%', bottom: 20, justifyContent: 'center', alignItems: 'center'}}
                onPress={() => navigation.navigate('AddTask', { })}
            >
                <Text style={{ 
                    width: '50%', height: 40, paddingVertical: 5, color: '#fff', fontSize: 16, 
                    fontWeight: 'bold', backgroundColor: '#ec1c24', borderRadius: 12, 
                    textAlign: 'center', textAlignVertical: 'center', elevation: 5,}}>nouvelle tâche/rdv</Text>
            </TouchableOpacity>
        
        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        // height: '100%',
        // width: '100%',
        // paddingHorizontal: 5
        // zIndex: 0,
    },

    rowBack: {
        zIndex: 2,
        alignItems: 'center',
        // backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 5,
        margin: 5,
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
        width: 90,
    },
    
});


export default TaskScreen;