import React, {useCallback, useEffect, useState} from "react";
import {ActivityIndicator, Button, FlatList, Platform, StyleSheet, Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import ProductOverviewButtons from "../../components/shop/ProductOverviewButtons";
import * as cartActions from "../../store/actions/cart.action";
import * as productActions from "../../store/actions/products.action";
import Color from "../../constants/Color";

const ProductOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.availableProducts);

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try{
            await dispatch(productActions.fetchProduct());
        }catch (err) {
            setError(err.message)
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSub = props.navigation.addListener('willFocus', loadProducts);
        return () => {
            willFocusSub.remove();
        };
    }, [loadProducts]);

    useEffect(() => {
        setIsLoading(true)
        loadProducts().then(() => {setIsLoading(false)});
    }, [dispatch, loadProducts]);

    const selectedItemHandler = (id, title) => {
        props.navigation.navigate({
            routeName: 'ProductDetail',
            params: {
                productId: id,
                title: title,
            },
        });
    };

    const addToCart = (item) => {
        dispatch(cartActions.addToCart(item))
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button title='Try again'
                        onPress={loadProducts}
                        color={Color.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Color.primary}/>
            </View>
        );
    }

    if(!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>No products found. Start adding same!</Text>
            </View>
        );
    }

    return (
        <FlatList data={products}
                  onRefresh={loadProducts}
                  refreshing={isRefreshing}
                  renderItem={itemData => (
                      <ProductItem data={itemData.item}
                                   onSelect={() => {
                                       selectedItemHandler(itemData.item.id, itemData.item.title)
                                   }}>
                          <ProductOverviewButtons onAddToCart={() => addToCart(itemData.item)}/>
                      </ProductItem>
                  )}
        />
    );
};

ProductOverviewScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'All Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu'
                      iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'}
                      onPress={() => {
                          navData.navigation.toggleDrawer()
                      }}
                />
            </HeaderButtons>
        ),
    };
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProductOverviewScreen;
