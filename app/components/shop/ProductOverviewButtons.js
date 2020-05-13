import React from "react";
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Color from "../../constants/Color";

const ProductOverviewButtons = props => {

    const isIos = Platform.OS === "ios";
    let Touchable = TouchableOpacity;

    if (!isIos && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <View style={styles.actions}>
            <Touchable onPress={props.onAddToCart}>
                <View style={styles.icons}>
                    <Ionicons name={isIos ? 'ios-add' : 'md-add'}
                              size={23}
                              color={Color.primary}
                    />
                    <Ionicons name={isIos ? 'ios-cart' : 'md-cart'}
                              size={23}
                              color={Color.primary}
                    />
                </View>
            </Touchable>
        </View>

    );
};

const styles = StyleSheet.create({
    actions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 20,
    },

    icons: {
        flexDirection: 'row',
    }
});

export default ProductOverviewButtons;
