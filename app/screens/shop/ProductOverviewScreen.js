import React from "react";
import {FlatList} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as cartActions from "../../store/actions/cart.action";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";

const ProductOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();
    return (
        <FlatList data={products}
                  renderItem={itemData => (
                      <ProductItem data={itemData.item}
                                   onViewDetails={() => {
                                       props.navigation.navigate({
                                           routeName: 'ProductDetail',
                                           params: {
                                               title: itemData.item.title,
                                               productId: itemData.item.id,
                                           },
                                       });
                                   }}
                                   onAddToCart={() => {
                                       dispatch(cartActions.addToCart(itemData.item));
                                   }}
                      />
                  )}
        />
    );
};

ProductOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Cart'
                      iconName={Platform.OS === "android"? 'md-cart' : 'ios-cart'}
                      onPress={() => {navData.navigation.navigate('Cart')}}
                />
            </HeaderButtons>
        )
    };
};

export default ProductOverviewScreen;
