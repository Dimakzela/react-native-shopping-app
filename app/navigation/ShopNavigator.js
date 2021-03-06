import {createStackNavigator} from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Color from "../constants/Color";
import {Button, Platform, SafeAreaView, Text, View} from "react-native";
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {createDrawerNavigator, DrawerItems} from "react-navigation-drawer";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import AuthScreen from "../screens/user/AuthScreen";
import StartupScreen from "../screens/StartupScreen";
import * as authActions from "../store/actions/auth.action";

const isIos = Platform.OS === "ios";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Color.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: isIos ? Color.primary : 'white'

};

const ProductsNav = createStackNavigator({
        ProductsOverview: ProductOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    }, {
        navigationOptions: {
            drawerIcon: drawerConfig =>
                <Ionicons
                    name={isIos ? 'ios-create' : 'md-create'}
                    size={23}
                    color={drawerConfig.tintColor}
                />

        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const ordersNav = createStackNavigator(
    {
        Orders: OrdersScreen,
    }, {
        navigationOptions: {
            drawerIcon: drawerConfig =>
                <Ionicons
                    name={isIos ? 'ios-list' : 'md-list'}
                    size={23}
                    color={drawerConfig.tintColor}
                />

        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const CartNav = createStackNavigator(
    {
        Cart: CartScreen,
    }, {
        navigationOptions: {
            drawerIcon: drawerConfig =>
                <Ionicons
                    name={isIos ? 'ios-cart' : 'md-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />

        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const AdminNav = createStackNavigator(
    {
        UserProduct: UserProductsScreen,
        EditProduct: EditProductScreen,
    }, {
        navigationOptions: {
            drawerIcon: drawerConfig =>
                <Ionicons
                    name={isIos ? 'ios-create' : 'md-create'}
                    size={23}
                    color={drawerConfig.tintColor}
                />

        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const tabScreenConfig = {
    Home: {
        screen: ProductsNav,
        navigationOptions: {
            tabBarLabel: !isIos ? <Text style={{fontFamily: 'open-sans-bold'}}>Home</Text> : '',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name={isIos ? 'ios-home' : 'md-home'}
                              size={25}
                              color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Color.primary
        }
    },
    Cart: {
        screen: CartNav,
        navigationOptions: {
            tabBarLabel: !isIos ? <Text style={{fontFamily: 'open-sans-bold'}}>Cart</Text> : '',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name={isIos ? 'ios-cart' : 'md-cart'}
                              size={25}
                              color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Color.accent
        }
    },
    Orders: {
        screen: ordersNav,
        navigationOptions: {
            tabBarLabel: !isIos ? <Text style={{fontFamily: 'open-sans-bold'}}>Orders</Text> : '',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name={isIos ? 'ios-list' : 'md-list'}
                              size={25}
                              color={tabInfo.tintColor}
                    />
                );
            },
            tabBarColor: Color.accent
        }
    },

};

const MealsFavTabNavigator = isIos ?
    createBottomTabNavigator(tabScreenConfig, {
            tabBarOptions: {
                activeTintColor: Color.secondaryColor,
                labelStyle: {
                    fontFamily: 'open-sans-bold'
                }
            }
        }
    )
    :
    createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true

    });

const ShopNav = createDrawerNavigator({
    Home: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Home',
            drawerIcon: () => (
                <Ionicons size={23}
                          name={isIos ? 'ios-home' : 'md-home'}>
                </Ionicons>
            )
        }
    },
    Admin: {
        screen: AdminNav,
        navigationOptions: {
            drawerLabel: 'Administrator'
        }
    },
}, {
    contentOptions: {
        activeTintColor: Color.primary
    },
    contentComponent: props => {
        return (
            <View style={{flex: 1, padding: 20}}>
                <SafeAreaView forceInsert={{top: 'always', horizontal: 'never'}}>
                    <DrawerItems {...props}/>
                    <Button title='Logout' color={Color.primary} onPress={() => {
                        authActions.logout();
                    }}/>
                </SafeAreaView>
            </View>
        );
    }
});

const AuthNav = createStackNavigator({
    Auth: {
        screen: AuthScreen,
        defaultNavOptions: defaultNavOptions
    }
});

const MainNav = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNav,
    Shop: ShopNav
});

export default createAppContainer(MainNav);
