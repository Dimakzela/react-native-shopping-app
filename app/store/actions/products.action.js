import Product from "../../models/product";

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCT = 'SET_PRODUCT';

export const fetchProduct = () => {
    return async (dispatch, getState) => {
        try{
            const userId = getState().auth.userId;
            const response = await fetch(
                'https://rn-shop-5f0c1.firebaseio.com/products.json'
            );

            if (response.ok) {
                const resData = await response.json();
                const loadedProducts = [];
                for (const key in resData) {
                    loadedProducts.push(new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price,
                    ));
                }
                dispatch({
                    type: SET_PRODUCT,
                    products: loadedProducts,
                    userProducts: loadedProducts.filter(prod => prod.ownerId === userId)
                });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            throw err;
        }
    };
}

export const deleteProduct = (pId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(`https://rn-shop-5f0c1.firebaseio.com/products/${pId}.json?auth=${token}`, {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_PRODUCT, pId: pId
        });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(`https://rn-shop-5f0c1.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }),
        });

        const responseData = await response.json();

        dispatch({
            type: CREATE_PRODUCT,
            productData: {id: responseData.name, title, description, imageUrl, price, ownerId: userId}
        });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        try{
            const token = getState().auth.token;
            const response = await fetch(
                `https://rn-shop-5f0c1.firebaseio.com/products/${id}.json?auth=${token}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                }),
            });

            if(response.ok) {
                dispatch({
                    type: UPDATE_PRODUCT,
                    pId: id,
                    productData: {
                        title,
                        description,
                        imageUrl}
                });
            } else {
                throw new Error('Something went wrong')
            }

        } catch (err) {
            throw err;
        }
    };
};
