import React from "react";
import {Alert, FlatList, Platform, StyleSheet} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import CustomHeaderButton from "../../components/UI/CustomHeaderButton";
import UserProductButtons from "../../components/shop/UserProductButtons";
import * as productActions from "../../store/actions/products.action";

const UserProductsScreen = props => {
    const userProduct = useSelector(state => state.products.userProducts);

    const dispatch = useDispatch();
    const deleteProduct = (pId) => {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            {text: 'No', style: "cancel"},
            {text: 'Yes', style: "destructive",
                onPress: () => {dispatch(productActions.deleteProduct(pId))}
            }
        ]);
    }

    const editProduct = (pId, title) => {
        props.navigation.navigate('EditProduct', {pId: pId, title: title});
    }

    return (
        <FlatList data={userProduct}
                  renderItem={itemData =>
                      <ProductItem data={itemData.item} onViewSelect={() => {}}>
                            <UserProductButtons onEdit={() => {editProduct(itemData.item.id, itemData.item.title)}}
                                                onDelete={() => {deleteProduct(itemData.item.id)}}
                            />
                      </ProductItem>
                  }
        />
    )
};

UserProductsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Menu'
                      iconName={Platform.OS === "android"? 'md-menu' : 'ios-menu'}
                      onPress={() => {navData.navigation.toggleDrawer()}}
                />
            </HeaderButtons>
        ),

        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title='Create'
                      iconName={Platform.OS === "android"? 'md-add' : 'ios-add'}
                      onPress={() => {navData.navigation.navigate('EditProduct')}}
                />
            </HeaderButtons>
        ),
    };
};

export default UserProductsScreen;
