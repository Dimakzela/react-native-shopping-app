import React, {useCallback, useReducer, useState} from "react";
import {ActivityIndicator, Button, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from "react-native";
import Card from "../../components/UI/Card";
import Input from "../../components/UI/Input";
import Color from "../../constants/Color";
import {LinearGradient} from "expo-linear-gradient";
import {useDispatch} from "react-redux";
import * as authActions from "../../store/actions/auth.action"

const FORM_UPDATE = 'FORM_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_UPDATE) {
        const updateValue = {
            ...state.inputValue,
            [action.input]: action.value
        };

        const updateValidity = {
            ...state.inputValidity,
            [action.input]: action.isValid
        }

        let formIsValid = true;
        for (const key in updateValidity) {
            formIsValid = formIsValid && updateValidity[key];
        }

        return {
            formIsValid: formIsValid,
            inputValidity: updateValidity,
            inputValue: updateValue
        };
    }
    return state;
}

const AuthScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [isSignUp, setIsSignUp] = useState(false);
    const dispatch = useDispatch();

    const signUp = async () => {
        setError(null);
        setIsLoading(true);
        try{
            await dispatch(authActions.signUp(formState.inputValue.email, formState.inputValue.password));
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const login = async () => {
        setError(null)
        setIsLoading(true);
        try{
            await dispatch(authActions.login(formState.inputValue.email, formState.inputValue.password));
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const textChange = useCallback((input, value, isValid) => {
        setError(null)
        dispatchFormState({
            type: FORM_UPDATE,
            value: value,
            isValid: isValid,
            input: input
        })
    }, [dispatchFormState]);

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValue: {
            email: '',
            password: '',
        },
        inputValidity: {
            email: false,
            password: false,
        },
        formIsValid: false
    });

    return (
        <KeyboardAvoidingView style={styles.screen}>
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.container}>
                    <ScrollView/>
                    <Input
                        id='email'
                        label='E-Mail'
                        keyboardType='email-address'
                        required
                        email
                        autoCapitalize='none'
                        onInputChange={textChange}
                        value=''
                    />
                    <Input
                        id='password'
                        label='Password'
                        keyboardType='default'
                        secureTextEntry
                        required
                        minLength={6}
                        autoCapitalize='none'
                        onInputChange={textChange}
                        value=''
                    />
                    {error && <Text style={styles.error}>{error}</Text>}
                    {isLoading ? (<ActivityIndicator size='small' color={Color.primary}/>)
                        :
                        (<View style={styles.buttonContainer}>
                            <Button
                                title={isSignUp ? 'Sign Up' : 'Login'}
                                color={Color.primary}
                                onPress={isSignUp ? signUp : login}/>
                        </View>)}
                    <View style={styles.buttonContainer}>
                        <Button
                            title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'}`}
                            color={Color.accent}
                            onPress={() => {
                                setIsSignUp(prevState => !prevState);
                            }}/>
                    </View>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = () => {
    return {
        headerTitle: 'Authentication',
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        marginTop: 10
    },
    error: {
        marginTop: 10,
        textAlign: 'center',
        color: 'red',
        fontFamily: 'open-sans',
        fontSize: 14
    }
});

export default AuthScreen;
