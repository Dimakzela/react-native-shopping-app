import React from "react";
import {Button, Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import Color from "../../constants/Color";

const ProductItem = props => {

    let Touchable = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <View style={styles.product}>
            <View style={styles.touchable}>
                <Touchable onPress={props.onViewDetails} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.data.imageUrl}}/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.data.title}</Text>
                            <Text style={styles.price}>${props.data.price.toFixed(2)}</Text>
                        </View>
                        <View style={styles.actions}>
                            <Button color={Color.primary} title='View Details' onPress={props.onViewDetails}/>
                            <Button color={Color.primary} title='To Cart' onPress={props.onAddToCart}/>
                        </View>
                    </View>
                </Touchable>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    product: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
    },

    touchable: {
        overflow: 'hidden',
        borderRadius: 10,
    },

    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },

    image: {
        width: '100%',
        height: '100%',
    },

    details: {
        alignItems: 'center',
        height: '15%',
        padding: 10
    },

    title: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },

    price: {
        fontSize: 14,
        color: '#888',
        fontFamily: 'open-sans'
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20,
    },


});

export default ProductItem;