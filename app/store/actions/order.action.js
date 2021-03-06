import Order from "../../models/order";

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'ADD_ORDER';

export const fetchOrders = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try{
            const response = await fetch(
                `https://rn-shop-5f0c1.firebaseio.com/orders/${userId}.json`
            );

            if (response.ok) {
                const resData = await response.json();
                const loadedOrders = [];
                for (const key in resData) {
                    loadedOrders.push(new Order(
                        key,
                        resData[key].cartItem,
                        resData[key].totalAmount,
                        new Date(resData[key].date)
                    ));
                }
                dispatch({
                    type: SET_ORDER,
                    orderData: loadedOrders
                });
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            throw err;
        }
    };
}

export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const date = new Date().toISOString();
        const response = await fetch(`https://rn-shop-5f0c1.firebaseio.com/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date,
            })
        });

        if(!response.ok) {
            throw new Error('Error....');
        }

        const resData = await response.json();

        dispatch({
            type: ADD_ORDER,
            orderData: {
                id: resData.name,
                products: cartItems,
                amount: totalAmount,
                date: date
            }
        });

    };
};
