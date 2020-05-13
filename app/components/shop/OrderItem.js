import React, {useState} from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import Color from "../../constants/Color";
import CommonStyles from "../../constants/CommonStyleSheet"
import CartItem from "./CartItem";
import Card from "../UI/Card";


const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={{...CommonStyles.boldFont, ...styles.amount}}>R{props.totalAmount.toFixed(2)}</Text>
                <Text style={{...CommonStyles.font, ...styles.date}}>{props.date}</Text>
            </View>
            <Button color={Color.primary}
                    title={showDetails? 'Hide Details': 'Show Details'}
                    onPress={() => {
                        setShowDetails(prevState => !prevState);
                    }}
            />
            {showDetails &&
            (<View style={styles.details}>
                {props.products.map(cartItem => (
                    <CartItem key={cartItem.productId}
                              productQuantity={cartItem.productQuantity}
                              productTitle={cartItem.productTitle}
                              productTotal={cartItem.productTotal}
                    />
                ))}
            </View>)
            }
        </Card>
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
    details: {
        width: '100%'
    }
});

export default OrderItem;
