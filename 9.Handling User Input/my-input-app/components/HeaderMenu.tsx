import React from 'react'
import { HeaderButtons, HeaderButton, Item, HiddenItem } from "react-navigation-header-buttons";
import {Ionicons} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { withNavigation ,NavigationInjectedProps} from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';

const IoniconsHeaderButton = passMeFurther => (
    // the `passMeFurther` variable here contains props from <Item .../> as well as <HeaderButtons ... />
    // and it is important to pass those props to `HeaderButton`
    // then you may add some information like icon size or color (if you use icons)
    <HeaderButton {...passMeFurther} IconComponent={Ionicons} iconSize={23} color={Colors.masterColor}/>
);



const HeaderMenu = (props:NavigationInjectedProps) => {
    return (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
            <Item title="menu" iconName="ios-menu" onPress={() =>{
                props.navigation.dispatch(DrawerActions.toggleDrawer());
            }} />
        </HeaderButtons>
    )
}

export default withNavigation(HeaderMenu)
