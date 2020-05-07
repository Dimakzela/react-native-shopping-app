import React from "react";
import {useSelector} from "react-redux";
import {FlatList} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import OrderItem from "../../components/shop/OrderItem";

const OrdersScreen = () => {
    const orders = useSelector(state => state.orders.orders);
    return (
        <FlatList data={orders}
                  keyExtractor={item => item.id}
                  renderItem={itemData =>
                      <OrderItem data={itemData.item}/>}
        />
    );
};

OrdersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu'
                      iconName={Platform.OS === "android"? 'md-menu' : 'ios-menu'}
                      onPress={() => {navData.navigation.toggleDrawer()}}
                />
            </HeaderButtons>
        ),
    };

};

export default OrdersScreen;
