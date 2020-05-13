import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ActivityIndicator, FlatList, StyleSheet, Text, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";
import * as ordersActions from "../../store/actions/order.action";
import Color from "../../constants/Color";
import CommonStyleSheet from "../../constants/CommonStyleSheet";

const OrdersScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    const loadOrders = useCallback(async () => {
        setIsLoading(true);
        await dispatch(ordersActions.fetchOrders());
        setIsLoading(false);
    },[setIsLoading, dispatch]);

    useEffect( () => {
        loadOrders().then();
    }, [loadOrders]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Color.primary}/>
            </View>
        );
    }

    if(orders.length === 0) {
        return (
            <View style={styles.textContainer}>
                <Text style={{...CommonStyleSheet.boldFont, ...styles.text}}>
                    No order(s) available! Please Place an order.
                </Text>
            </View>
        );
    }

    return (
        <FlatList data={orders}
                  keyExtractor={item => item.id}
                  renderItem={itemData =>
                      <OrderItem totalAmount={itemData.item.totalAmount}
                                 date={itemData.item.readableDate}
                                 products={itemData.item.products}
                      />}
        />
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text: {
        fontSize: 16,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu'
                      iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                      onPress={() => {
                          navData.navigation.toggleDrawer()
                      }}
                />
            </HeaderButtons>
        ),
    };

};

export default OrdersScreen;
