
import React from 'react'
import { View, Text ,StyleSheet, TouchableOpacity} from 'react-native'

const GoalItem = ({id,title,onDelete}) => {

    console.log('GoalItem',id);

    return (
        <TouchableOpacity style={styles.container} onPress={onDelete.bind(this,id)}>
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        borderWidth:1,
        padding:10,
        marginVertical:10,
        backgroundColor:'#ccc',
        borderColor:'black',
        borderWidth:1,
    }
})


export default GoalItem
