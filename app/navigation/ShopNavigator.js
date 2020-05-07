import {createStackNavigator} from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Color from "../constants/Color";
import {Platform, Text} from "react-native";
import {createAppContainer} from "react-navigation";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrdersScreen from "../screens/shop/OrdersScreen";
import {createDrawerNavigator} from "react-navigation-drawer";
import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

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
    headerTintColor: isIos? Color.primary: 'white'

};

const ProductsNav = createStackNavigator({
        ProductsOverview: ProductOverviewScreen,
        ProductDetail: ProductDetailScreen,
        Cart: CartScreen,
    }, {
        navigationOptions: {
            drawerIcon: drawerConfig =>
                <Ionicons
                    name={isIos? 'ios-create' : 'md-create'}
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
                    name={isIos? 'ios-list' : 'md-list'}
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
                    name={isIos? 'ios-cart' : 'md-cart'}
                    size={23}
                    color={drawerConfig.tintColor}
                />

        },
        defaultNavigationOptions: defaultNavOptions
    }
);

const tabScreenConfig = {
    Products: {
        screen: ProductsNav,
        navigationOptions: {
            tabBarLabel: !isIos ? <Text style={{fontFamily: 'open-sans-bold'}}>Products</Text> : '',
            tabBarIcon: tabInfo => {
                return (
                    <Ionicons name={isIos ? 'ios-create' : 'md-create'}
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
    Products: MealsFavTabNavigator,
}, {
    contentOptions: {
        activeTintColor: Color.primary
    }
});

export default createAppContainer(ShopNav);
