import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton = (props) => (
    // the `props` here come from <Item ... />
    // you may access them and pass something else to `HeaderButton` if you like
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color="blue" />
);


type Props={
    iconName:string,
    onPress:()=>void
}

const HeaderItem:React.FC<Props> = ({iconName,onPress}) => {
    return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item title={iconName} iconName={iconName} onPress={onPress} />
        </HeaderButtons>
    )
}

export default HeaderItem
