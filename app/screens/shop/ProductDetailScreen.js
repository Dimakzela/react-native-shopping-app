import React from "react";
import {Button, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Color from "../../constants/Color";
import * as cartActions from "../../store/actions/cart.action";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Color.primary} title='Add to Cart' onPress={() => {
                    dispatch(cartActions.addToCart(selectedProduct));
                }}/>
            </View>
            <Text style={styles.price}>R{selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = (navData) => {
    const title = navData.navigation.getParam('title');
    return {
        headerTitle: title
    }

};

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center',
    },
    price: {
        fontSize: 20,
        color: '#888',
        fontFamily: 'open-sans-bold',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20
    },

});

export default ProductDetailScreen;
