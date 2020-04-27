import React from 'react'
import { View, Text } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import {withNavigation,NavigationInjectedProps} from 'react-navigation'
import HeaderButton from "../components/HeaderButton";
import { DrawerActions } from 'react-navigation-drawer';


const HeaderMenu = (props:NavigationInjectedProps) => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            props.navigation.dispatch(DrawerActions.toggleDrawer())
          }}
        />
      </HeaderButtons>
    );
}

export default withNavigation(HeaderMenu)
