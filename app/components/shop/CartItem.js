import React from "react";
import {StyleSheet, Text, TouchableOpacity, Platform, View} from "react-native";
import {Ionicons} from '@expo/vector-icons'

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.quantity}>{props.productQuantity} </Text>
                <Text style={styles.title}>{props.productTitle}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>R{props.productTotal.toFixed(2)}</Text>
                {props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteBtn}>
                    <Ionicons name={Platform.OS === "android"? 'md-trash' : 'ios-trash'}
                              size={23}
                              color='red'
                    />
                </TouchableOpacity>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    quantity: {
        fontFamily: 'open-sans',
        color: '#888',
        fontSize: 16
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    amount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    deleteBtn: {
        marginLeft: 20
    },
});

export default CartItem;
