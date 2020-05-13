import React, {useCallback, useEffect, useReducer, useState} from "react";
import {ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View} from "react-native";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import {useDispatch, useSelector} from "react-redux";
import * as productActions from "../../store/actions/products.action";
import Input from "../../components/UI/Input";
import Color from "../../constants/Color";

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

const EditProductScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const productId = props.navigation.getParam('pId');
    const selectedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === productId));

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValue: {
            title: selectedProduct ? selectedProduct.title : '',
            description: selectedProduct ? selectedProduct.description : '',
            imageUrl: selectedProduct ? selectedProduct.imageUrl : '',
            price: '',
        },
        inputValidity: {
            title: !!selectedProduct,
            description: !!selectedProduct,
            imageUrl: !!selectedProduct,
            price: !!selectedProduct,
        },
        formIsValid: !!selectedProduct
    });

    const saveProduct = useCallback(async () => {
        if (!formState.formIsValid) {
            Alert.alert('Wrong input', 'Please complete the form', [
                {text: 'OK', style: "default"}
            ]);
            return
        }
        setError(null);
        setIsLoading(true);
        try{
            if (selectedProduct) {
                await dispatch(
                    productActions.updateProduct(
                        productId,
                        formState.inputValue.title,
                        formState.inputValue.description,
                        formState.inputValue.imageUrl));
            } else {
                await dispatch(
                    productActions.createProduct(
                        formState.inputValue.title,
                        formState.inputValue.description,
                        formState.inputValue.imageUrl,
                        +formState.inputValue.price));
            }
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
        props.navigation.goBack();
    }, [dispatch, formState]);

    useEffect(() => {
        props.navigation.setParams({save: saveProduct});
    }, [saveProduct])

    const textChange = useCallback((input, value, isValid) => {
        dispatchFormState({
            type: FORM_UPDATE,
            value: value,
            isValid: isValid,
            input: input
        })
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Color.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={50} enabled>
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Title'
                        keyboardType='default'
                        returnKeyType='next'
                        autoCapitalize='sentences'
                        onInputChange={textChange}
                        value={selectedProduct ? selectedProduct.title : ''}
                        isValid={!!selectedProduct}
                        required
                    />
                    {!selectedProduct &&
                    <Input
                        id='price'
                        label='Price'
                        keyboardType='decimal-pad'
                        returnKeyType='next'
                        onInputChange={textChange}
                        required
                    />
                    }
                    <Input
                        id='imageUrl'
                        label='image Url'
                        keyboardType='url'
                        returnKeyType='next'
                        autoCapitalize='sentences'
                        onInputChange={textChange}
                        value={selectedProduct ? selectedProduct.imageUrl : ''}
                        isValid={!!selectedProduct}
                        required
                    />
                    <Input
                        id='description'
                        label='Description'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        multiline
                        numberOfLines={3}
                        onInputChange={textChange}
                        value={selectedProduct ? selectedProduct.description : ''}
                        isValid={!!selectedProduct}
                        required
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = (navData) => {
    const title = navData.navigation.getParam('title');
    const save = navData.navigation.getParam('save');
    return {
        headerTitle: title ? title : 'Add Product',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Save'
                      iconName={Platform.OS === "android" ? 'md-checkmark' : 'ios-checkmark'}
                      onPress={save}
                />
            </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;
