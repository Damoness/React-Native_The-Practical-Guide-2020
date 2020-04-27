import React from 'react'
import { View, Text ,TextProps,StyleSheet} from 'react-native'

const DefaultText:React.FC<TextProps> = (props) => {
    return (
        <Text style={[styles.text,props.style]}>{props.children}</Text>
    )
}

const styles = StyleSheet.create({
    text:{
        fontFamily:'open-sans'
    }
})


export default DefaultText
