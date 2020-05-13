import React, {useEffect, useReducer} from "react";
import {StyleSheet, Text, TextInput, View} from "react-native";

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid,
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.value ? props.value : '',
        isValid: props.isValid,
        touched: false,
    });

    const {onInputChange, id} = props

    useEffect(() => {
        if(inputState.touched) {
            props.onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChange = (text) => {

        dispatch({
            type: INPUT_CHANGE,
            value: text
        });

        let isValid = false;
        if (props.required && text.trim().length > 0) {
            isValid = true
        }

        dispatch({
            type: INPUT_CHANGE,
            value: text,
            isValid: isValid
        });

    };

    const lostFocus = () => {
        dispatch({type: INPUT_BLUR});
    }

    return (
        <View style={styles.formControl}>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChange}
                onFocus={lostFocus}
            />
            {!inputState.isValid && inputState.touched &&
            <Text style={styles.error}>Error: This field is required</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8,
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },

    error: {
        marginVertical: 5,
        fontFamily: 'open-sans',
        color: 'red',
        fontSize: 13
    }
});

export default Input;
