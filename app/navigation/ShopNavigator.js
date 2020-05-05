import {createStackNavigator} from "react-navigation-stack";
import ProductOverviewScreen from "../screens/shop/ProductOverviewScreen";
import Color from "../constants/Color";
import {Platform} from "react-native";
import {createAppContainer} from "react-navigation";

const ProductsNav = createStackNavigator({
    ProductsOverview: ProductOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Color.primary : ''
        },
        headerTintColor: Platform.OS === "android" ? 'white' : Color.primary
    }
});

export default createAppContainer(ProductsNav);
