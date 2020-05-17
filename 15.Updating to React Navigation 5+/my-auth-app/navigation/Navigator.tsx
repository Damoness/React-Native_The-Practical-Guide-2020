import UserProductsScreen from "../screens/user/UserProductsScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import React, { useRef, useEffect } from "react";

// import {
//   createAppContainer,
//   createSwitchNavigator,
//   SafeAreaView,
// } from "react-navigation";
// import { createStackNavigator } from "react-navigation-stack";

// import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
// import EditProductScreen from "../screens/user/EditProductScreen";
// import CartScreen from "../screens/shop/CartScreen";
// import Colors from "../constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import React from "react";
// import { StackNavigationOptions } from "react-navigation-stack/lib/typescript/src/vendor/types";
// import AuthScreen from "../screens/user/AuthScreen";
// import StartupScreen from "../screens/StartupScreen";

import { View, Text, Button ,SafeAreaView} from "react-native";
import { useDispatch } from "react-redux";
import { logOut } from "../store/auth/actions";

import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { createDrawerNavigator, DrawerItemList } from "@react-navigation/drawer";
import {} from "@react-navigation/native";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import Product from "../models/product";
import Colors from "../constants/Colors";
import EditProductScreen from "../screens/user/EditProductScreen";
import { Ionicons } from "@expo/vector-icons";
import AuthScreen from "../screens/user/AuthScreen";

export type ProductsStackParamList = {
  ProductsOverviewScreen: {};
  CartScreen: {};
  ProductDetailScreen: { product: Product };
};

const ProductsStackNavigator = createStackNavigator<ProductsStackParamList>();

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

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverviewScreen"
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreen.navigationOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetailScreen"
        component={ProductDetailScreen}
        options={ProductDetailScreen.navigationOptions}
      />
      <ProductsStackNavigator.Screen name="CartScreen" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
};

export type OrderStackParamList = {
  OrdersScreen: {};
};

const OrderStackNavigator = createStackNavigator<OrderStackParamList>();

export const OrderNavigator = () => {
  return (
    <OrderStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrderStackNavigator.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={OrdersScreen.navigationOptions}
      />
    </OrderStackNavigator.Navigator>
  );
};

export type AdminStackParamList = {
  UserProductsScreen: {};
  EditProductScreen: {
    product?: Product;
  };
};

const AdminStackNavigator = createStackNavigator<AdminStackParamList>();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen
        component={UserProductsScreen}
        name={"UserProductsScreen"}
        options={UserProductsScreen.navigationOptions}
      />
      <AdminStackNavigator.Screen
        component={EditProductScreen}
        name={"EditProductScreen"}
      />
    </AdminStackNavigator.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {

  const dispatch = useDispatch();

  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.masterColor
      }}
      drawerContent={props=>{

              return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                  <SafeAreaView>
                    <DrawerItemList {...props} />
                    <Button
                      title="Logout"
                      color={Colors.masterColor}
                      onPress={() => {
                        dispatch(logOut());
                      }}
                    />
                  </SafeAreaView>
                </View>
               );
      }}
    >
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={() => {
          return {
            drawerIcon: ({ color }) => (
              <Ionicons name={"ios-cart"} size={23} color={color} />
            ),
          };
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrderNavigator}
        options={() => {
          return {
            drawerIcon: ({ color }) => (
              <Ionicons name={"ios-list"} size={23} color={color} />
            ),
          };
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={() => {
          return {
            drawerIcon: ({ color }) => (
              <Ionicons name={"ios-create"} size={23} color={color} />
            ),
          };
        }}
      />
    </Drawer.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = ()=>{
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        //options={authScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  )
}


// const ProductsNavigator = createStackNavigator(
//   {
//     ProductsOverview: ProductsOverviewScreen,
//     ProductDetailScreen: ProductDetailScreen,
//     CartScreen: CartScreen,
//   },
//   {
//     defaultNavigationOptions,
//   }
// );

// const OrderNavigator = createStackNavigator(
//   {
//     OrdersScreen,
//   },
//   {
//     defaultNavigationOptions,
//   }
// );

// const AdminNavigator = createStackNavigator(
//   {
//     UserProductsScreen,
//     EditProductScreen,
//   },
//   { defaultNavigationOptions }
// );

// const drawerNavigator = createDrawerNavigator(
//   {
//     Products: {
//       screen: ProductsNavigator,
//       navigationOptions: {
//         drawerIcon: ({ tintColor }) => (
//           <Ionicons name={"ios-cart"} size={23} color={tintColor} />
//         ),
//       },
//     },
//     Orders: {
//       screen: OrderNavigator,
//       navigationOptions: {
//         drawerIcon: ({ tintColor }) => (
//           <Ionicons name={"ios-list"} size={23} color={tintColor} />
//         ),
//       },
//     },
//     Admin: {
//       screen: AdminNavigator,
//       navigationOptions: {
//         drawerIcon: ({ tintColor }) => (
//           <Ionicons name={"ios-create"} size={23} color={tintColor} />
//         ),
//       },
//     },
//   },
//   {
//     contentOptions: {
//       activeTintColor: Colors.masterColor,
//     },
//     contentComponent: (props) => {

//         const dispatch = useDispatch();

//       return (
//         <View style={{ flex: 1, paddingTop: 20 }}>
//           <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
//             <DrawerItems {...props} />
//             <Button
//               title="Logout"
//               color={Colors.masterColor}
//               onPress={() => {
//                 dispatch(logOut());
//                 props.navigation.navigate('Auth');
//               }}
//             />
//           </SafeAreaView>
//         </View>
//       );
//     },
//   }
// );



// const AuthNavigator = createStackNavigator({
//   Auth: AuthScreen,
// });

// const mainNavigator = createSwitchNavigator({
//   Startup: StartupScreen,
//   Auth: AuthNavigator,
//   App: drawerNavigator,
// });

// const Navigator = createAppContainer(mainNavigator);

// export default Navigator;
