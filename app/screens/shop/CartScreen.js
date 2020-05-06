import React from "react";
import {Button, FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Color from "../../constants/Color";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart.action";

const CartScreen = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => {
        const transformedProducts = [];
        for (let key in state.cart.items) {
            transformedProducts.push({
               productId: key,
               productTitle: state.cart.items[key].title,
               productPrice: state.cart.items[key].price,
               productQuantity: state.cart.items[key].quantity,
               productTotal: state.cart.items[key].total,
            });
        }
        return transformedProducts.sort((a, b) =>
            a.productId > b.productId ? 1 : -1);
    });
    const total = useSelector(state => state.cart.totalAmount);
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.total}>R{total.toFixed(2)}</Text></Text>
                <Button disabled={products.length === 0}
                        color={Color.accent}
                        title='Checkout' onPress={() => {}}/>
            </View>
            <FlatList  data={products}
                       keyExtractor={item => item.productId}
                       renderItem={itemData => <CartItem data={itemData.item} onRemove={() => {
                           dispatch(cartActions.removeFromCart(itemData.item.productId))}
                       }/>}
            />
        </View>
    );
};

CartScreen.navigationOptions = () => {

};

const styles = StyleSheet.create({
    screen: {
        margin: 20,
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'open-sans-bold'
    },
    total: {
        color: Color.primary
    },
});

export default CartScreen
