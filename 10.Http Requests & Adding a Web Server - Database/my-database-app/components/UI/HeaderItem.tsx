import React from 'react'
import { HeaderButtons, HeaderButton, Item, HiddenItem } from "react-navigation-header-buttons";
import {Ionicons} from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const IoniconsHeaderButton = passMeFurther => (
    // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
    // and it is important to pass those props to `HeaderButton`
    // then you may add some information like icon size or color (if you use icons)
    <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color={Colors.masterColor}/>
  );


type Props ={
    onPress:()=>void,
    iconName:string
}

const HeaderItem:React.SFC<Props> = ({onPress,iconName}) => {
    return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title={iconName} iconName={iconName} onPress={onPress} />
        </HeaderButtons>
    )
}

export default HeaderItem
