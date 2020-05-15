import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import {
  createAppContainer,
  createSwitchNavigator,
  SafeAreaView,
} from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import CartScreen from "../screens/shop/CartScreen";
import Colors from "../constants/Colors";

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StackNavigationOptions } from "react-navigation-stack/lib/typescript/src/vendor/types";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";

import { View, Text, Button } from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../store/auth/actions";

const defaultNavigationOptions: StackNavigationOptions = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerTintColor: Colors.masterColor,
  headerTitleAlign: "center",
};

const OrderNavigator = createStackNavigator(
  {
    OrdersScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProductsScreen,
    EditProductScreen,
  },
  { defaultNavigationOptions }
);

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen,
    ProductDetailScreen: ProductDetailScreen,
    CartScreen: CartScreen,
  },
  {
    defaultNavigationOptions,
  }
);

const drawerNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"ios-cart"} size={23} color={tintColor} />
        ),
      },
    },
    Orders: {
      screen: OrderNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"ios-list"} size={23} color={tintColor} />
        ),
      },
    },
    Admin: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Ionicons name={"ios-create"} size={23} color={tintColor} />
        ),
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.masterColor,
    },
    contentComponent: (props) => {

        const dispatch = useDispatch();

      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={Colors.masterColor}
              onPress={() => {
                dispatch(logOut());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: AuthScreen,
});

const mainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  App: drawerNavigator,
});

const Navigator = createAppContainer(mainNavigator);

export default Navigator;
