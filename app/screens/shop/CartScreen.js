import React, {useState} from "react";
import {ActivityIndicator, Button, FlatList, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Color from "../../constants/Color";
import CartItem from "../../components/shop/CartItem";
import * as cartActions from "../../store/actions/cart.action";
import * as orderActions from "../../store/actions/order.action";
import Card from "../../components/UI/Card";

const CartScreen = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
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

    const sendOrder = async () => {
        setIsLoading(true);
        await dispatch(orderActions.addOrder(products, total));
        setIsLoading(false);
    }

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>Total: <Text style={styles.total}>R{Math.round(total.toFixed(2) * 100) / 100}</Text></Text>
                {isLoading ? <ActivityIndicator size='large' color={Color.primary}/>
                :
                <Button disabled={products.length === 0}
                        color={Color.accent}
                        title='Checkout' onPress={sendOrder}/>}
            </Card>
            <FlatList data={products}
                      keyExtractor={item => item.productId}
                      renderItem={itemData =>
                          <CartItem productQuantity={itemData.item.productQuantity}
                                    productTitle={itemData.item.productTitle}
                                    productTotal={itemData.item.productTotal}
                                    deletable
                                    onRemove={() => {
                                        dispatch(cartActions.removeFromCart(itemData.item.productId))
                                    }
                                    }
                          />
                      }
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
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
    },
    summaryText: {
        fontFamily: 'open-sans-bold'
    },
    total: {
        color: Color.primary
    }
});

export default CartScreen
