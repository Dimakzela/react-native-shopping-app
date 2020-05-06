import {createStackNavigator} from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Color from "../constants/Color";
import {Platform} from "react-native";
import {createAppContainer} from "react-navigation";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";

const ProductsNav = createStackNavigator({
    ProductsOverview: ProductOverviewScreen,
    ProductDetail: ProductDetailScreen,
    Cart: CartScreen,
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold',
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans',
        },
        headerTintColor: Platform.OS === "android" ? 'white' : Color.primary
    }
});

export default createAppContainer(ProductsNav);
