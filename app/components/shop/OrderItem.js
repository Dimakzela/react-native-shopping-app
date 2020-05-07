import React from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import Color from "../../constants/Color";
import CommonStyles from "../../constants/CommonStyleSheet"


const OrderItem = props => {
    return(
        <View style={{...CommonStyles.card, ...styles.orderItem}}>
            <View style={styles.summary}>
                <Text style={{...CommonStyles.boldFont, ...styles.amount}}>R{props.data.totalAmount.toFixed(2)}</Text>
                <Text style={{...CommonStyles.font, ...styles.date}}>{props.data.readableDate}</Text>
            </View>
            <Button color={Color.primary} title='Show Details' onPress={() => {}}/>
        </View>
    );
};
const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    amount: {
       fontSize: 16
    },
    date: {
        fontSize: 16,
        color: '#888'
    },
});

export default OrderItem;
