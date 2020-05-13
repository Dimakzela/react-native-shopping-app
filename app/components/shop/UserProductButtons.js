import React from "react";
import {Platform, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Color from "../../constants/Color";

const UserProductButtons = props => {

    const isIos = Platform.OS === "ios";
    let Touchable = TouchableOpacity;

    if (!isIos && Platform.Version >= 21) {
        Touchable = TouchableNativeFeedback;
    }

    return (
        <View style={styles.actions}>
            <Touchable onPress={props.onEdit}>
                <View style={styles.icons}>
                    <Ionicons name={isIos ? 'ios-create' : 'md-create'}
                              size={25}
                              color={Color.primary}
                    />
                </View>
            </Touchable>
            <Touchable onPress={props.onDelete}>
                <View style={styles.icons}>
                    <Ionicons name={isIos ? 'ios-trash' : 'md-trash'}
                              size={25}
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '23%',
        paddingHorizontal: 30,
    },

    icons: {
        flexDirection: 'row',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default UserProductButtons;
