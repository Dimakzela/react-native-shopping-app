import React, {useEffect} from "react";
import {ActivityIndicator, AsyncStorage, StyleSheet, View} from "react-native";
import Color from "../constants/Color";
import * as authActions from "../store/actions/auth.action";
import {useDispatch} from "react-redux";

const StartupScreen = (props) => {
    const dispatch = useDispatch();

    useEffect( () => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('Auth');
                return;
            }

            const transformedData = JSON.stringify(userData);
            const {token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);
            console.log('.......' +expirationDate)
            if(expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth');
                return;
            }

            let expiryTime = expirationDate.getTime() - new Date().getTime();

            props.navigation.navigate('Shop');
            dispatch(authActions.authenticate(userId, token, expiryTime));

        };
        tryLogin().then();
    }, [dispatch]);

    return(
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Color.primary}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;
