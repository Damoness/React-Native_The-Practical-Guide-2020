import React,{useState} from 'react'
import { View,TextInput,Button,Modal,StyleSheet} from 'react-native'

const GoalInput = ({onAddGoal,visible,onCancel}) => {

    const [goal,setGoal] = useState('');

    const goalInputHandler =  enteredText => {
        setGoal(enteredText);
    }

    const addGoalHandler = () =>{

        onAddGoal(goal);
        setGoal('');

    }

    console.log('GoalInput');

    return (
        <Modal visible={visible} animationType={'slide'} >
            <View style={styles.inputContainer}>

            <TextInput placeholder="input your goal" style={styles.input} value={goal} onChangeText={goalInputHandler}/>

                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title={'CANCEL'}  color={'red'} onPress={onCancel.bind(this)} />
                    </View>
                    <View style={styles.button}>
                        <Button  title={'ADD'} onPress={addGoalHandler}/>
                    </View>
                </View>
            </View>

        </Modal>

    )
}

const styles = StyleSheet.create({
    inputContainer:{
        justifyContent:'center',alignItems:'center',flex:1
    },
    input:{
        width:'80%',
        borderColor:'black',
        borderWidth:1,
        padding:10,
        marginBottom:10,
    },
    buttonContainer:{
        width:'60%',
        flexDirection:'row',
        justifyContent:'space-around',
    },
    button:{
        width:'40%'
    }
})


export default GoalInput
