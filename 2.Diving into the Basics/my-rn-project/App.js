import React ,{useState}from 'react';
import { StyleSheet, View ,FlatList, Button} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [goals, setGoals] = useState([]);
  const [isAddModal,setIsAddModal]  = useState(false)

  function addGoalHandler(goalText){

     setGoals(currentGoals=>[
       ...currentGoals,
       {id:Math.random().toString(),value:goalText}
     ])

     setIsAddModal(false)
  }


  function cancelGoalHandler(){
    setIsAddModal(false)
  }


  function deleteGoalHandler(goalId){
    setGoals(currentGoals=>currentGoals.filter(goal=>goal.id !== goalId));
  }


  console.log('App');

  return (
    <View style={styles.container}>
      
      <Button title={'Add New Goal'} onPress={()=>setIsAddModal(true)} />

      <FlatList
        keyExtractor={(item,index)=>item.id}
        data={goals}
        renderItem={({item,index})=><GoalItem title={item.value} id={item.id} onDelete={deleteGoalHandler}/>}
      />

      <GoalInput onAddGoal={addGoalHandler} visible={isAddModal} onCancel={cancelGoalHandler}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding:50,
  },
});
