import React, {useState} from 'react';
import {combineReducers, createStore} from "redux";

import productsReducer from './app/store/reducers/products.reducer';
import cartReducer from './app/store/reducers/cart.reducer';
import orderReducer from './app/store/reducers/order.reducer';
import {Provider} from "react-redux";
import ShopNavigator from "./app/navigation/ShopNavigator";
import {enableScreens} from "react-native-screens";
import {AppLoading} from "expo";
import * as Font from 'expo-font';
import {composeWithDevTools} from "redux-devtools-extension";

enableScreens();

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    order: orderReducer
});

const fetchFont = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    });
};

const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false);

    if (!fontLoaded) {
        return <AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)}/>
    }

    return (
        <Provider store={store}>
            <ShopNavigator/>
        </Provider>
    );
}
