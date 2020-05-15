import React from 'react'
import { View, Text,StyleSheet, ViewProps } from 'react-native'



const Card:React.FC<ViewProps> = (props) => {
    return (
        <View style={[styles.container,props.style]}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({

    container:{
        borderRadius:10,
        //overflow:'hidden',
        margin:20,
        backgroundColor:'white',

        shadowColor:'black',
        shadowOpacity:0.26,
        shadowOffset:{width:0,height:2},

    },

})


export default Card
