import React from 'react';
import { Text, View } from 'react-native';
import {combineReducers, createStore} from "redux";

import productsReducer from './app/store/reducers/products.reducer';
import {Provider} from "react-redux";
import ShopNavigator from "./app/navigation/ShopNavigator";
import {enableScreens} from "react-native-screens";

enableScreens();

const rootReducer = combineReducers({
    products: productsReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
      <Provider store={store}>
          <ShopNavigator/>
      </Provider>
  );
}
