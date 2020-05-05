import React ,{useReducer,useEffect} from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TextInputProps,
} from "react-native";

type Props = {
    id:string,
    onInputChange:(id:string,value:string,isValid:boolean)=>void,
    errorText:string,
    label:string,
    initialValue:string,
    initiallyValid:boolean,


    required:boolean,
    minLength?:number,
    min?:number,
    max?:number,

} & TextInputProps;

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';


interface ChangeAction {
    type:typeof INPUT_CHANGE,
    value:string,
    isValid:boolean,
}

interface BlurAction {
    type:typeof INPUT_BLUR,
}

type Action= ChangeAction | BlurAction;

type InputState={
    value:string,
    isValid:boolean,
    touched:boolean,
}

function inputReducer(state:InputState,action:Action):InputState{

    switch(action.type){
        case INPUT_CHANGE:{

            return {
                ...state,
                value:action.value,
                isValid:action.isValid,
            }

        }
        case INPUT_BLUR:{
            return {
                ...state,
                touched:true,
            }
        }
    }

    return state;
}

const Input: React.FC<Props> = (props) => {

  const {id,onInputChange} = props;

  const initialState = {
      value:props.initialValue?props.initialValue:'',
      isValid:props.initiallyValid,
      touched:false,
  }  

  const [inputState, dispatch] = useReducer(inputReducer, initialState)


  const textChangeHandler = (text:string) =>{

    

    let isValid = true;

    if(props.required && text.trim().length == 0){
        isValid = false
    }

    if(props.min!=null && +text < props.min){

        isValid = false;
    }

    if(props.max!=null && +text > props.max){
        
        isValid = false;
    }

    if(props.minLength!=null && text.length < props.minLength){

       isValid = false;

    }

    console.log(text,isValid);

    dispatch({
        type:'INPUT_CHANGE',
        value:text,
        isValid:isValid,
    })

  }


  useEffect(() => {
      
      // if(inputState.touched){
      //   onInputChange && onInputChange(id,inputState.value,inputState.isValid)
      // }

      //console.log("inputState",inputState);
      onInputChange && onInputChange(id,inputState.value,inputState.isValid)

  }, [inputState,onInputChange,id])


  const lostFocusHandler=()=>{

    dispatch({type:INPUT_BLUR});

  }

  return (
    <View style={styles.formControl}>
      <Text style={styles.title}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.textInput}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  textInput: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13
  }
});

export default Input;
