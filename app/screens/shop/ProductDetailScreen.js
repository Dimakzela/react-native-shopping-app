import React from "react";
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View
} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import Color from "../../constants/Color";
import * as cartActions from "../../store/actions/cart.action";
import {Ionicons} from "@expo/vector-icons";
import CommonStyles from "../../constants/CommonStyleSheet"


const isIos = Platform.OS === "ios";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
        state.products.availableProducts.find(prod => prod.id === productId));
    const dispatch = useDispatch();

    let Touchable = TouchableOpacity;

    if (Platform.OS === "android" && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Touchable onPress={() => {dispatch(cartActions.addToCart(selectedProduct))}}>
                    <View style={{...CommonStyles.card, ...styles.touchable}}>
                        <Ionicons name={isIos ? 'ios-add' : 'md-add'}
                                  size={23}
                                  color={isIos? Color.primary: 'white'}
                        />
                        <Ionicons name={isIos ? 'ios-cart' : 'md-cart'}
                                  size={23}
                                  color={isIos? Color.primary: 'white'}
                        />
                        <Text style={styles.touchableText}>Add to Cart</Text>
                    </View>
                </Touchable>
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

    touchable: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: isIos? 'transparent': Color.primary,
        borderColor: Color.primary,
        borderWidth: isIos? 0: 1
    },

    touchableText: {
        color: isIos? Color.primary: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        paddingLeft: 10,
    }
});

export default ProductDetailScreen;
