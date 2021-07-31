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
import TaskModal from '../components/TaskModal';


const TaskScreen = ( props ) => {

    const { navigation, userId } = props;

    const [ isOpen, setIsOpen ] = useState(false)

    // recupère actions et states.. du context MainContext
    const context = useContext(MainContext);
    const { taskContext, useTaskSelector } = context
    const { getTask, setTaskStatus, setTask, delTask } = taskContext

    const isLoading = useTaskSelector((state) => { return state.isLoading; }) || null
    const taskList = useTaskSelector((state) => { return state.taskData; }) || null

    useEffect(() => {
        // console.log('loading all tasks..')
        getTask()

    }, [taskContext])


    const renderItem = ({item}) => <ItemList item={item} /> 

    const renderHiddenItem = (data, rowMap) => <HiddenItem data={data} rowMap={rowMap} />
    
    const onItemOpen = rowKey => console.log('This row opened', rowKey)


    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 2}} colors={['#ec1c24', '#000',]} style={styles.container}>

            <TaskModal isOpen={isOpen} setIsOpen={setIsOpen} />

            { taskList.length != 0 ? // si données à afficher

                <SwipeListView
                    contentContainerStyle={{ paddingTop: 80, paddingBottom: 80, paddingHorizontal: 5 }}
                    data={taskList[0]}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    keyExtractor={(item, index) => index}
                    leftOpenValue={80}
                    rightOpenValue={-160}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onItemOpen}
                />

            : !isOpen && !isLoading ? // si la modal ajout tâche fermée..

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 80}}>
                    <Image
                        style={{ height: '50%', width: '50%', resizeMode: 'contain', }}
                        source={require('../img/icon/farnienteLightGrey.png')}
                    />
                    <Text style={{ color :'#ccc'}}>Cool aujourd'hui..</Text>
                </View>

            : null }

            { !isOpen ?

                <TouchableOpacity
                    style={{zIndex: 5, position: 'absolute', width: '100%', bottom: 20, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => setIsOpen(!isOpen)}
                >
                    <Text style={{ 
                        width: '50%', height: 40, paddingVertical: 5, color: '#fff', fontSize: 16, 
                        fontWeight: 'bold', backgroundColor: '#ec1c24', borderRadius: 12, 
                        textAlign: 'center', textAlignVertical: 'center', elevation: 5,}}>{isOpen ? 'annuler' : 'nouvelle tâche/rdv'}</Text>
                </TouchableOpacity>

            : null }
        
        </LinearGradient>
    )

}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        // paddingHorizontal: 5
        // zIndex: 0,
    },
    
});


export default TaskScreen;