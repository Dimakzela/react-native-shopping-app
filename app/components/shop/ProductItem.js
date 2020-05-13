import React from "react";
import {Image, Platform, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import Card from "../UI/Card";

const ProductItem = props => {

    let Touchable = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <Card style={styles.product}>
            <View style={styles.touchable}>
                <Touchable onPress={props.onSelect} useForeground>
                    <View>
                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{uri: props.data.imageUrl}} resizeMode="contain"/>
                        </View>
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.data.title}</Text>
                            <Text style={styles.price}>${props.data.price.toFixed(2)}</Text>
                        </View>
                        {props.children}
                    </View>
                </Touchable>
            </View>
        </Card>

    );
};

const styles = StyleSheet.create({
    product: {
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
        marginTop: 5,
        width: '100%',
        height: '100%',
    },

    details: {
        alignItems: 'center',
        height: '17%',
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
    }

});

export default ProductItem;
