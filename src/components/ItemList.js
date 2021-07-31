import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment'


const ItemList = ( props ) => {

    
    const { item } = props
    const { name, status, date, hour, type } = item

    // formatage date et heure //
    let fDate = moment(date).format('dddd MMMM YYYY')
    let fHour = moment(hour).format('hh:mm')

    return (

        <LinearGradient start={{x: 0, y: 0}} end={{x: 0, y: 3}} colors={['#C81920', '#C81920']} 
            style={styles.container}>
            {/* <View style={{}}>
                <Image style={{ height: 20 , width: 20, opacity: 0.4 }} source={status == 'open' ? require('../img/icon/checkBoxLightGrey.png') : require('../img/icon/checkBoxLightGreyChecked.png')} />
            </View> */}
            <View style={{ paddingHorizontal: 15}}>
                <Text numberOfLines={1} style={{ color: '#fff', fontSize: 18, fontWeight: 'bold',}}>{name}</Text>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: '#ccc', fontWeight: 'bold', marginRight: 20}}>{fHour}</Text>
                    <Text style={{ color: '#444', fontWeight: 'bold',}}>{fDate}</Text>
                </View>
            </View>
        </LinearGradient>

    )
}


const styles = StyleSheet.create({

    container: { 
        zIndex: 1,
        flexDirection: 'row', 
        height: 70, 
        alignItems: 'center',
        paddingVertical: 8, 
        paddingHorizontal: 15,
        marginVertical: 3, 
        borderRadius: 3,  
    }

});


export default ItemList;
